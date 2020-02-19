import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  )
}

export default LoadingScreen
