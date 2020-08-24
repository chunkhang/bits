import React from 'react'
import { View } from 'react-native'

import { useStyles, useTheme } from '~/hooks'
import { TaskList } from '~/containers'

import styles from './styles'

const TasksDoneScreen = () => {
  const classes = useStyles(styles)
  const theme = useTheme()

  return (
    <View style={classes.mainContainer}>
      <TaskList
        taskType="done"
        color={theme.colors.green}
      />
    </View>
  )
}

export default TasksDoneScreen
