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
import {Appearance} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useIsFocused,
} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {observer} from 'mobx-react';
// import {Auth, useAuthContext} from '@/AuthContext';
import {
  AppStoresProvider,
  createStore,
  useAppStoresContext,
  // useAppStoresContext,
  useTargetStore,
} from '@/stores';
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
import AppearanceScreen from '@/screens/AppearanceScreen';
import ThemeScreen from '@/screens/ThemeScreen';
import {useColorScheme} from 'react-native';
import ChatRoom from '@/screens/ChatRoom';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator();

let locale: LocaleType = loadLocale();

const MainScreen: React.ComponentType = observer(() => {
  const isFocused = useIsFocused();
  const {isLoading, token, themeData, appTheme} = useTargetStore('userStore');

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  return (
    <MainStack.Navigator
      screenOptions={() => ({
        headerStyle: {
          shadowColor: 'transparent', // ios
          elevation: 0, // android
          backgroundColor: isFocused
            ? themeData.header_bg_home
            : themeData.header_bg_home_blur,
        },
        headerTitleStyle: {
          color: themeData.header_title_color,
        },
      })}>
      {token == null ? (
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
        <>
          <MainStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Signal',
              ...TransitionPresets.FadeFromBottomAndroid,
            }}
          />
          <MainStack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={({navigation}) => ({
              headerLeft: () => <HeaderLeft navigation={navigation} />,
              title: 'Chat Room',
            })}
          />
        </>
      )}
    </MainStack.Navigator>
  );
});

const ModalParentStack = createStackNavigator<ModalParentStackParamList>();

const ModalParentScreen = () => {
  const {getMessage} = useAppStoresContext();

  return (
    <ModalParentStack.Navigator
      screenOptions={({navigation}) => ({
        headerStatusBarHeight: 0,
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerBackground: () => <HeaderBackground />,
        headerLeft: () => <HeaderLeft navigation={navigation} />,
      })}>
      <ModalParentStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({navigation}) => ({
          title: getMessage('settings'),
          headerLeft: () => (
            <HeaderLeft navigation={navigation} text={getMessage('done')} />
          ),
        })}
      />
      <ModalParentStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          title: getMessage('profile'),
        })}
      />
      <ModalParentStack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={() => ({title: getMessage('Appearance')})}
      />
      <ModalParentStack.Screen
        name="Theme"
        component={ThemeScreen}
        options={() => ({title: getMessage('Theme')})}
      />
    </ModalParentStack.Navigator>
  );
};

const ModalChildStack = createStackNavigator<ModalChildStackParamList>();

const ModalChildScreen = () => {
  const {getMessage} = useAppStoresContext();

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
      <ModalChildStack.Screen
        name="EditName"
        component={EditNameScreen}
        options={({navigation}) => ({
          title: getMessage('YourName'),
          headerLeft: () => (
            <HeaderLeft navigation={navigation} text={getMessage('cancel')} />
          ),
        })}
      />
    </ModalChildStack.Navigator>
  );
};

// When using ModalPresentationIOS, status bar color does not invert
// https://github.com/react-navigation/react-navigation/issues/7916

const App = () => {
  const scheme = useColorScheme();
  const stores = createStore();

  React.useEffect(() => {
    const listener = Appearance.addChangeListener(
      ({colorScheme}: Appearance.AppearancePreferences) => {
        stores.userStore.setAppTheme(Appearance.getColorScheme()!);
      },
    );

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppStoresProvider messages={locale.messages} stores={stores}>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootStack.Navigator
            screenOptions={({route, navigation}) => ({
              presentation: 'modal',
              gestureEnabled: true,
              cardOverlayEnabled: true,
              headerStatusBarHeight:
                navigation
                  .getState()
                  .routes.findIndex((r: {key: string}) => r.key === route.key) >
                0
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
      </AppStoresProvider>
    </GestureHandlerRootView>
  );
};

export default App;
