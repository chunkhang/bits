import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Alert } from 'react-native'
import { observer } from 'mobx-react'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import { useStores, useStyles } from '~/hooks'
import { ListItem } from '~/components'

import styles from './styles'

const TaskDetailScreen = () => {
  const { taskStore } = useStores()
  const classes = useStyles(styles)

  const [originalValue, setOriginalValue] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    if (taskStore.task) {
      setOriginalValue(taskStore.task.name)
      setValue(taskStore.task.name)
    }
  }, [])

  useEffect(() => {
    if (!value.trim()) return
    taskStore.task.name = value
  }, [value])

  useEffect(() => {
    if (taskStore.task) {
      setValue(taskStore.task.name)
    }
  }, [taskStore.task])

  const onChangeText = (input) => {
    setValue(input)
  }

  const onSubmitEditing = () => {
    if (!value.trim()) {
      setValue(originalValue)
    }
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
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
      <View style={classes.actionContainer}>
        <TouchableOpacity onPress={onPress}>
          <Icon
            name="trash-2"
            type="feather"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default observer(TaskDetailScreen)
