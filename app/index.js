import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'

import { StoreContext } from '~/contexts'
import RootStore, { rehydrate } from '~/stores/RootStore'
import RootScreen from '~/screens/RootScreen'
import LoadingScreen from '~/screens/LoadingScreen'

const store = new RootStore()

const App = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    rehydrate(store).then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <NavigationContainer>
      <StoreContext.Provider value={store}>
        <ThemeProvider>
          {loading ? <LoadingScreen /> : <RootScreen />}
        </ThemeProvider>
      </StoreContext.Provider>
    </NavigationContainer>
  )
}

export default App

export {
  StoreContext,
}
