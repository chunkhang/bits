/* eslint-disable no-console */

import { NativeModules } from 'react-native'
import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'

import packageJson from '../../package.json'

if (__DEV__) {
  // https://github.com/infinitered/reactotron/issues/272#issuecomment-272013885
  const { scriptURL } = NativeModules.SourceCode
  const host = scriptURL.split('://')[1].split(':')[0]

  Reactotron
    .setAsyncStorageHandler(AsyncStorage)
    .configure({ host, name: packageJson.name })
    .useReactNative({
      asyncStorage: false,
      networking: {
        ignoreUrls: /symbolicate/,
      },
    })
    .connect()

  // Clear every time app reloads
  Reactotron.clear()

  console.tron = Reactotron
} else {
  console.tron = {
    log: () => null,
    logImportant: () => null,
    warn: () => null,
    error: () => null,
    debug: () => null,
    display: () => null,
  }
}
