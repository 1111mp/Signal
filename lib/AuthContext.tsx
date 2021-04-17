import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type StateType = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
};

export type ActionType =
  | {type: 'RESTORE_TOKEN'; token: string | null}
  | {type: 'SIGN_IN'; token: string | null}
  | {type: 'SIGN_OUT'};

type AuthContextType = {
  state: StateType;
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
  getMessage: I18nFn;
} | null;

type AuthProps = {
  children: React.ReactNode;
  messages: {[key: string]: {message: string}};
};

export type ReplacementValuesType = {
  [key: string]: string | number;
};

export type I18nFn = (
  key: string,
  substitutions?: Array<string | number> | ReplacementValuesType,
) => string;

const AuthContext = React.createContext<AuthContextType>(null);

async function getToken(): Promise<string | null> {
  try {
    let user_info = await AsyncStorage.getItem('user_info');

    if (user_info == null) return 'null';

    const {token} = JSON.parse(user_info);

    return token;
  } catch (error) {
    return null;
  }
}

export const Auth: React.ComponentType<AuthProps> = ({
  children,
  messages,
}): JSX.Element => {
  const [state, dispatch] = React.useReducer(
    (prevState: StateType, action: ActionType): StateType => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async () => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  const getMessage = React.useCallback<I18nFn>(
    (key, substitutions) => {
      if (Array.isArray(substitutions) && substitutions.length > 1) {
        throw new Error(
          'Array syntax is not supported with more than one placeholder',
        );
      }

      const {message} = messages[key];
      if (!substitutions) {
        return message;
      }

      if (Array.isArray(substitutions)) {
        return substitutions.reduce(
          (result, substitution) =>
            result.toString().replace(/\$.+?\$/, substitution.toString()),
          message,
        ) as string;
      }

      const FIND_REPLACEMENTS = /\$([^$]+)\$/g;

      let match = FIND_REPLACEMENTS.exec(message);
      let builder = '';
      let lastTextIndex = 0;

      while (match) {
        if (lastTextIndex < match.index) {
          builder += message.slice(lastTextIndex, match.index);
        }

        const placeholderName = match[1];
        const value = substitutions[placeholderName];
        if (!value) {
          // eslint-disable-next-line no-console
          console.error(
            `i18n: Value not provided for placeholder ${placeholderName} in key '${key}'`,
          );
        }
        builder += value || '';

        lastTextIndex = FIND_REPLACEMENTS.lastIndex;
        match = FIND_REPLACEMENTS.exec(message);
      }

      if (lastTextIndex < message.length) {
        builder += message.slice(lastTextIndex);
      }

      return builder;
    },
    [messages],
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await getToken();
      } catch (e) {
        // Restoring token failed
        userToken = null;
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={{state, getMessage, ...authContext}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }

  return auth;
};
