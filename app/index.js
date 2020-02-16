import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <SafeAreaView>
          <Text>Hello World</Text>
        </SafeAreaView>
      </ThemeProvider>
    </NavigationContainer>
  )
}

export default App
