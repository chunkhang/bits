import React from 'react'
import { View } from 'react-native'

import { useStyles } from '~/hooks'
import { TaskList } from '~/containers'

import styles from './styles'

const TasksUpcomingScreen = () => {
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
      <TaskList type="upcoming" />
    </View>
  )
}

export default TasksUpcomingScreen
