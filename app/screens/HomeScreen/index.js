import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { observer } from 'mobx-react'

import { useStores } from '~/hooks'

const HomeScreen = () => {
  const { taskStore } = useStores()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Increment"
        onPress={() => {
          taskStore.increment()
        }}
      />
      <Text>{taskStore.count}</Text>
    </View>
  )
}

export default observer(HomeScreen)
