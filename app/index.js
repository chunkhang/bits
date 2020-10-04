import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import PushNotification from 'react-native-push-notification'

import { StoreContext } from '~/contexts'
import AppRouter from '~/router'
import rootStore from '~/stores'
import '~/i18n'

import theme from './theme'

// https://github.com/zo0r/react-native-push-notification
PushNotification.configure({
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  requestPermissions: true,
})

const App = () => {
  useEffect(() => {
    rootStore.rehydrate().then(() => {
      Actions.homeScreen()
    })
  }, [])

  return (
    <NavigationContainer>
      <StoreContext.Provider value={rootStore}>
        <ThemeProvider theme={theme}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: theme.colors.white,
            }}
          >
            <AppRouter />
          </SafeAreaView>
        </ThemeProvider>
      </StoreContext.Provider>
    </NavigationContainer>
  )
}

export default App
