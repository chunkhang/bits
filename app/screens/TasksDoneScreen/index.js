import React from 'react'
import { View } from 'react-native'

import { useStyles } from '~/hooks'
import { TaskList } from '~/containers'

import styles from './styles'

const TasksDoneScreen = () => {
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
      <TaskList taskType="done" />
    </View>
  )
}

export default TasksDoneScreen
