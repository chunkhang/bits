import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import { StoreContext } from '~/contexts'
import AppRouter from '~/router'
import RootStore from '~/stores/RootStore'

import theme from './theme'

const rootStore = new RootStore()

const App = () => {
  useEffect(() => {
    rootStore.rehydrate().then(() => {
      Actions.tabs()
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

export {
  StoreContext,
}
