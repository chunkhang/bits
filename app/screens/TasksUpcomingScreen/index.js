import React from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer } from 'mobx-react'

import { useStores, useStyles, useTheme } from '~/hooks'
import { BloopSound } from '~/assets/sounds'
import { TaskList } from '~/containers'

import styles from './styles'

const TasksUpcomingScreen = () => {
  const { upcomingStore, todayStore } = useStores()
  const classes = useStyles(styles)
  const theme = useTheme()

  const onUpdate = (task, updates) => {
    upcomingStore.updateTask(task.id, updates)
  }

  const onRemove = (task) => {
    Actions.pop()
    upcomingStore.removeTask(task.id)
  }

  const onPressItem = (task) => {
    Actions.taskDetailScreen({
      color: theme.colors.red,
      task,
      onUpdate,
      onRemove,
    })
  }

  const onSwipeRight = (task) => {
    upcomingStore.removeTask(task.id)
    todayStore.addTask(task)
    BloopSound.stop()
    BloopSound.play()
  }

  return (
    <View style={classes.mainContainer}>
      <TaskList
        color={theme.colors.red}
        tasks={upcomingStore.tasks.slice()}
        onPressItem={onPressItem}
        swipeRightEnabled
        swipeRightColor={theme.colors.yellow}
        onSwipeRight={onSwipeRight}
      />
    </View>
  )
}

export default observer(TasksUpcomingScreen)
