import * as React from 'react';
import {configure} from 'mobx';
import manager from './StoreManager';
import ClientStore from './client';
import UserStore from './user';
import {I18nFn} from '@/locale';

configure({
  enforceActions: 'never',
});

export type TStore = {
  clientStore: ClientStore;
  userStore: UserStore;
};

export type MStore = {
  // userStore: UserStore;
};

export type RootStore = TStore & MStore;

type AppStoresProps = {
  children: React.ReactNode;
  stores: RootStore;
  messages: {[key: string]: {message: string}};
};

export function createStore(): RootStore {
  const stores: TStore = {
    clientStore: new ClientStore(),
    userStore: new UserStore(),
  };

  try {
    manager.stores = {
      // userStore: new UserStore(),
    };
  } catch (e) {
    console.log(e);
  }

  manager.init();

  return {
    ...stores,
    ...(manager.stores as MStore),
  };
}

// const stores = createStore();

type AppStoresContextType =
  | (RootStore & {
      getMessage: I18nFn;
    })
  | null;

export const AppStoresContext = React.createContext<AppStoresContextType>(null);

export const AppStoresProvider: React.ComponentType<AppStoresProps> = ({
  children,
  messages,
  stores,
}) => {
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
    stores.userStore.signIn();
  }, []);

  React.useLayoutEffect(() => {
    stores.userStore.setTheme('system');
  }, []);

  return (
    <AppStoresContext.Provider value={{...stores, getMessage}}>
      {children}
    </AppStoresContext.Provider>
  );
};

export const useAppStoresContext = () => {
  const appstores = React.useContext(AppStoresContext);

  if (!appstores) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('You have forgot to use AppStoresProvider, shame on you.');
  }

  return appstores;
};

export function useTargetStore<K extends keyof RootStore>(
  target: K,
): RootStore[K] {
  const stores = useAppStoresContext();

  return stores[target];
}

// export default stores;
