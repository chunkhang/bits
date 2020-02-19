import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'

import { StoreContext } from '~/contexts'
import RootStore from '~/stores/RootStore'
import RootScreen from '~/screens/RootScreen'

const store = new RootStore()

const App = () => {
  return (
    <NavigationContainer>
      <StoreContext.Provider value={store}>
        <ThemeProvider>
          <RootScreen />
        </ThemeProvider>
      </StoreContext.Provider>
    </NavigationContainer>
  )
}

export default App

export {
  StoreContext,
}
