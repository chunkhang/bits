import React from 'react'
import { View, Text } from 'react-native'

import { useStores } from '~/hooks'

const HomeScreen = () => {
  const { taskStore } = useStores()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{JSON.stringify(taskStore.list)}</Text>
    </View>
  )
}

export default HomeScreen
