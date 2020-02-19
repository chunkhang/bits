import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'

import { StoreContext } from '~/contexts'
import RootStore, { rehydrate } from '~/stores/RootStore'
import RootScreen from '~/screens/RootScreen'
import LoadingScreen from '~/screens/LoadingScreen'

const store = new RootStore()

const App = () => {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    rehydrate(store).then(() => {
      setHydrated(true)
    })
  }, [])

  return (
    <NavigationContainer>
      <StoreContext.Provider value={store}>
        <ThemeProvider>
          {hydrated ? <RootScreen /> : <LoadingScreen />}
        </ThemeProvider>
      </StoreContext.Provider>
    </NavigationContainer>
  )
}

export default App

export {
  StoreContext,
}
