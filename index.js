import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'

import './app/config/reactotron'
import App from './app/index'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
