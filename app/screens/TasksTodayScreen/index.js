import React from 'react'
import { View } from 'react-native'

import { useStyles, useTheme } from '~/hooks'
import { TaskList } from '~/containers'

import styles from './styles'

const TasksTodayScreen = () => {
  const classes = useStyles(styles)
  const theme = useTheme()

  return (
    <View style={classes.mainContainer}>
      <TaskList
        taskType="today"
        color={theme.colors.yellow}
      />
    </View>
  )
}

export default TasksTodayScreen
