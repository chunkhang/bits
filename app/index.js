import React from 'react'
import {
  SafeAreaView,
  Text,
} from 'react-native'
import { ThemeProvider } from 'react-native-elements'

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaView>
        <Text>Hello World</Text>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default App
