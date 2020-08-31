import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import 'react-native-get-random-values'

// import './app/config/reactotron'
import './app/config'
import App from './app/index'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
