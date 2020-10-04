import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer } from 'mobx-react'
import PushNotification from 'react-native-push-notification'

import { useStores, useStyles, useTheme } from '~/hooks'
import { BloopSound, ChimeSound } from '~/assets/sounds'
import TaskList from '~/containers/TaskList'

import styles from './styles'

const TodayTasksScreen = () => {
  const { upcomingStore, todayStore, doneStore, settingsStore } = useStores()
  const classes = useStyles(styles)
  const theme = useTheme()

  useEffect(() => {
    if (settingsStore.badges) {
      PushNotification.setApplicationIconBadgeNumber(todayStore.tasks.length)
    } else {
      // Clear badge if badges settings is disabled
      PushNotification.setApplicationIconBadgeNumber(0)
    }
  }, [todayStore.tasks.length, settingsStore.badges])

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
    BloopSound.play()
  }

  const onSwipeRight = (task) => {
    todayStore.removeTask(task.id)
    doneStore.addTask(task)
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

export default observer(TodayTasksScreen)
