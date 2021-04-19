/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {Auth, useAuthContext} from '@/AuthContext';
import loadLocale, {LocaleType} from '@/locale';

import HeaderLeft from '@/components/HeaderLeft';
import HeaderBackground from '@/components/HeaderBackground';

import HomeScreen from '@/screens/HomeScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import SignInScreen from '@/screens/SignIn';
import SignUpScreen from '@/screens/SignUp';
import ProfileScreen from '@/screens/ProfileScreen';
import AccountScreen from '@/screens/AccountScreen';
import EditNameScreen from '@/screens/EditNameScreen';
import OutWardScreen from '@/screens/OutWardScreen';
import ThemeScreen from '@/screens/ThemeScreen';

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator();

let locale: LocaleType = loadLocale();

const MainScreen: React.ComponentType = () => {
  const {state} = useAuthContext()!;

  useEffect(() => {
    if (!state.isLoading) {
      SplashScreen.hide();
    }
  }, [state]);

  return (
    <MainStack.Navigator>
      {state.userToken == null ? (
        <>
          <MainStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: 'Sign in',
              // When logging out, a pop animation feels intuitive
              ...TransitionPresets.FadeFromBottomAndroid,
            }}
          />
          <MainStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: 'Sign up',
            }}
          />
        </>
      ) : (
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Signal',
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
      )}
    </MainStack.Navigator>
  );
};

const ModalParentStack = createStackNavigator<ModalParentStackParamList>();

const ModalParentScreen = () => {
  return (
    <ModalParentStack.Navigator
      screenOptions={({navigation}) => ({
        headerStatusBarHeight: 0,
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerBackground: () => <HeaderBackground />,
        headerLeft: () => <HeaderLeft navigation={navigation} />,
      })}>
      <ModalParentStack.Screen name="Settings" component={SettingsScreen} />
      <ModalParentStack.Screen name="Info" component={ProfileScreen} />
      <ModalParentStack.Screen name="OutWard" component={OutWardScreen} />
      <ModalParentStack.Screen name="Theme" component={ThemeScreen} />
    </ModalParentStack.Navigator>
  );
};

const ModalChildStack = createStackNavigator<ModalChildStackParamList>();

const ModalChildScreen = () => {
  return (
    <ModalChildStack.Navigator
      screenOptions={({navigation}) => ({
        headerStatusBarHeight: 0,
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerBackground: () => <HeaderBackground />,
        headerLeft: () => <HeaderLeft navigation={navigation} />,
      })}>
      <ModalChildStack.Screen name="Account" component={AccountScreen} />
      <ModalChildStack.Screen name="EditName" component={EditNameScreen} />
    </ModalChildStack.Navigator>
  );
};

// When using ModalPresentationIOS, status bar color does not invert
// https://github.com/react-navigation/react-navigation/issues/7916

const App = () => {
  const scheme = useColorScheme();

  return (
    <Auth messages={locale.messages}>
      <NavigationContainer /** theme={scheme === 'dark' ? DarkTheme : DefaultTheme} */
      >
        <RootStack.Navigator
          mode="modal"
          screenOptions={({route, navigation}) => ({
            gestureEnabled: true,
            cardOverlayEnabled: true,
            headerStatusBarHeight:
              navigation
                .dangerouslyGetState()
                .routes.findIndex((r: {key: string}) => r.key === route.key) > 0
                ? 0
                : undefined,
            headerLeft: () => <HeaderLeft navigation={navigation} />,
            ...TransitionPresets.ModalPresentationIOS,
          })}>
          <RootStack.Screen
            name="Main"
            component={MainScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="ModalParent"
            component={ModalParentScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="ModalChild"
            component={ModalChildScreen}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Auth>
  );
};

export default App;
