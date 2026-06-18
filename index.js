/**
 * React Native CLI (bare) entry point.
 *
 * Unlike the Expo demo (which uses `registerRootComponent` from 'expo'),
 * the bare workflow registers the root component directly with AppRegistry
 * using the app name declared in app.json.
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
