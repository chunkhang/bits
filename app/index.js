import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'
import PushNotification from 'react-native-push-notification'
import { ColorSchemeProvider } from 'react-native-dynamic'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    rootStore.rehydrate().then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <NavigationContainer>
      <StoreContext.Provider value={rootStore}>
        <ColorSchemeProvider>
          <ThemeProvider theme={theme}>
            <SafeAreaProvider>
              {loading ? (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                  <ActivityIndicator />
                </SafeAreaView>
              ) : (
                <AppRouter />
              )}
            </SafeAreaProvider>
          </ThemeProvider>
        </ColorSchemeProvider>
      </StoreContext.Provider>
    </NavigationContainer>
  )
}

export default App
