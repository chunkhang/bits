import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'
import PushNotification from 'react-native-push-notification'
import { ColorSchemeProvider } from 'react-native-dynamic'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'

import { StoreContext } from '~/contexts'
import AppRouter from '~/router'
import rootStore from '~/stores'
import database from '~/database'
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    rootStore.rehydrate().finally(() => {
      database.migrate()
      setLoading(false)
      setTimeout(() => {
        SplashScreen.hide()
      }, 0)
    })
  }, [])

  return (
    <NavigationContainer>
      <StoreContext.Provider value={rootStore}>
        <ColorSchemeProvider>
          <ThemeProvider theme={theme}>
            <SafeAreaProvider>
              {!loading ? (
                <AppRouter />
              ) : null}
            </SafeAreaProvider>
          </ThemeProvider>
        </ColorSchemeProvider>
      </StoreContext.Provider>
    </NavigationContainer>
  )
}

export default App
