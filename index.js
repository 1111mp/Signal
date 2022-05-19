/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// https://github.com/lottie-react-native/lottie-react-native/issues/858#issuecomment-1091884653
LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);

AppRegistry.registerComponent(appName, () => App);
