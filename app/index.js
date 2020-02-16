import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'

import RootScreen from './screens/RootScreen'

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <RootScreen />
      </ThemeProvider>
    </NavigationContainer>
  )
}

export default App
