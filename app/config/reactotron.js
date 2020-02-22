/* eslint-disable no-console */

import { NativeModules } from 'react-native'
import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'

if (__DEV__) {
  // https://github.com/infinitered/reactotron/issues/272#issuecomment-272013885
  const { scriptURL } = NativeModules.SourceCode
  const host = scriptURL.split('://')[1].split(':')[0]

  Reactotron
    .setAsyncStorageHandler(AsyncStorage)
    .configure({ host, name: 'Bits' })
    .useReactNative({
      asyncStorage: false,
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
