import React from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer } from 'mobx-react'

import { useStores, useStyles, useTheme } from '~/hooks'
import { BloopSound } from '~/assets/sounds'
import { TaskList } from '~/containers'

import styles from './styles'

const TasksDoneScreen = () => {
  const { todayStore, doneStore } = useStores()
  const classes = useStyles(styles)
  const theme = useTheme()

  const onUpdate = (task, updates) => {
    doneStore.updateTask(task.id, updates)
  }

  const onRemove = (task) => {
    Actions.pop()
    doneStore.removeTask(task.id)
  }

  const onPressItem = (task) => {
    Actions.taskDetailScreen({
      color: theme.colors.green,
      task,
      onUpdate,
      onRemove,
    })
  }

  const onSwipeLeft = (task) => {
    doneStore.removeTask(task.id)
    todayStore.addTask(task)
    BloopSound.stop()
    BloopSound.play()
  }

  return (
    <View style={classes.mainContainer}>
      <TaskList
        color={theme.colors.green}
        tasks={doneStore.tasks.slice()}
        onPressItem={onPressItem}
        swipeLeftEnabled
        swipeLeftColor={theme.colors.yellow}
        onSwipeLeft={onSwipeLeft}
      />
    </View>
  )
}

export default observer(TasksDoneScreen)
