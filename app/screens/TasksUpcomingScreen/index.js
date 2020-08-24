import React from 'react'
import { View } from 'react-native'

import { useStyles, useTheme } from '~/hooks'
import { TaskList } from '~/containers'

import styles from './styles'

const TasksUpcomingScreen = () => {
  const classes = useStyles(styles)
  const theme = useTheme()

  return (
    <View style={classes.mainContainer}>
      <TaskList
        taskType="upcoming"
        color={theme.colors.red}
      />
    </View>
  )
}

export default TasksUpcomingScreen
