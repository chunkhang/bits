import React from 'react'
import { View, TouchableOpacity, Alert } from 'react-native'
import { observer } from 'mobx-react'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import { useStores, useTheme, useStyles } from '~/hooks'
import { ListItem } from '~/components'

import styles from './styles'

const TaskDetailScreen = () => {
  const { taskStore } = useStores()
  const theme = useTheme()
  const classes = useStyles(styles)

  const onChangeText = (input) => {
    if (!input.trim()) return
    taskStore.task.name = input
  }

  const onPress = () => {
    Alert.alert(
      'Delete task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            Actions.pop()
            taskStore.removeTask(taskStore.task.id)
          },
        },
      ],
    )
  }

  return (
    <View style={classes.mainContainer}>
      <ListItem
        editable
        value={taskStore.task.name}
        onChangeText={onChangeText}
        color={theme.colors.yellow}
      />
      <TouchableOpacity
        style={classes.iconContainer}
        onPress={onPress}
      >
        <Icon
          name="trash-2"
          type="feather"
        />
      </TouchableOpacity>
    </View>
  )
}

export default observer(TaskDetailScreen)
