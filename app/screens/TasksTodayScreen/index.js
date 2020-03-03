import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { observer } from 'mobx-react'

import { useStores, useStyles } from '~/hooks'

import styles from './styles'

const TasksTodayScreen = () => {
  const { taskStore } = useStores()
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
      <View style={{ backgroundColor: 'red', flex: 1 }} />
    </View>
  )
}

export default observer(TasksTodayScreen)
