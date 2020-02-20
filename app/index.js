import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'

import { StoreContext } from '~/contexts'
import RootStore from '~/stores/RootStore'
import LoadingScreen from '~/screens/LoadingScreen'
import RootRouter from '~/routers/RootRouter'

import theme from './theme'

const rootStore = new RootStore()

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
        <ThemeProvider theme={theme}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: theme.colors.black,
            }}
          >
            {loading ? <LoadingScreen /> : <RootRouter />}
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
