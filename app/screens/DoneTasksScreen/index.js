import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer } from 'mobx-react'
import I18n from 'i18n-js'

import { useStores, useStyles, useTheme } from '~/hooks'
import { BloopSound } from '~/assets/sounds'
import TaskList from '~/containers/TaskList'
import utils from '~/utils'

import styles from './styles'

const DoneTasksScreen = () => {
  const { todayStore, doneStore, layoutStore } = useStores()
  const classes = useStyles(styles)
  const theme = useTheme()

  useEffect(() => {
    layoutStore.onClear(() => {
      if (doneStore.tasks.length === 0) return
      utils.confirmAlert({
        title: I18n.t('alert.clearTasks.title'),
        message: I18n.t('alert.clearTasks.message'),
        confirm: I18n.t('alert.clearTasks.confirm'),
        onConfirm: () => {
          doneStore.clearTasks()
        },
        destructive: true,
      })
    })
  }, [])

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

export default observer(DoneTasksScreen)
