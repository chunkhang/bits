import React from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer } from 'mobx-react'

import { useStores, useStyles, useTheme } from '~/hooks'
import { BloopSound, ChimeSound } from '~/assets/sounds'
import { TaskList } from '~/containers'

import styles from './styles'

const TasksTodayScreen = () => {
  const { upcomingStore, todayStore, doneStore } = useStores()
  const classes = useStyles(styles)
  const theme = useTheme()

  const onUpdate = (task, updates) => {
    todayStore.updateTask(task.id, updates)
  }

  const onRemove = (task) => {
    Actions.pop()
    todayStore.removeTask(task.id)
  }

  const onPressItem = (task) => {
    Actions.taskDetailScreen({
      color: theme.colors.yellow,
      task,
      onUpdate,
      onRemove,
    })
  }

  const onSort = (order) => {
    todayStore.reorderTasks(order)
  }

  const onSwipeLeft = (task) => {
    todayStore.removeTask(task.id)
    upcomingStore.addTask(task)
    BloopSound.stop()
    BloopSound.play()
  }

  const onSwipeRight = (task) => {
    todayStore.removeTask(task.id)
    doneStore.addTask(task)
    ChimeSound.stop()
    ChimeSound.play()
  }

  return (
    <View style={classes.mainContainer}>
      <TaskList
        color={theme.colors.yellow}
        tasks={todayStore.tasks.slice()}
        onPressItem={onPressItem}
        sortEnabled
        onSort={onSort}
        swipeLeftEnabled
        swipeLeftColor={theme.colors.red}
        onSwipeLeft={onSwipeLeft}
        swipeRightEnabled
        swipeRightColor={theme.colors.green}
        onSwipeRight={onSwipeRight}
      />
    </View>
  )
}

export default observer(TasksTodayScreen)
