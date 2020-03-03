import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import { useStyles } from '~/hooks'
import { PlusIcon } from '~/components'

import styles from './styles'

const ActionBar = () => {
  const classes = useStyles(styles)

  const hitSlop = 42

  const handlePress = () => {
    Actions.todayTasks()
    Actions.addTask()
  }

  return (
    <View style={classes.mainContainer}>
      <Button
        icon={<PlusIcon size={16} />}
        buttonStyle={classes.buttonStyle}
        hitSlop={{
          top: hitSlop,
          bottom: hitSlop,
          left: hitSlop,
          right: hitSlop,
        }}
        onPress={handlePress}
      />
    </View>
  )
}

export default ActionBar
