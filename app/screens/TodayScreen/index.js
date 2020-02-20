import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { observer } from 'mobx-react'

import { useStores, useStyles } from '~/hooks'

import styles from './styles'

const TodayScreen = () => {
  const { taskStore } = useStores()
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
      <Button
        title="Increment"
        onPress={() => {
          taskStore.increment()
        }}
      />
      <Button
        title="Reset"
        onPress={() => {
          taskStore.reset()
        }}
      />
      <Text>{taskStore.count}</Text>
    </View>
  )
}

export default observer(TodayScreen)
