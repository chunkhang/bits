import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Alert } from 'react-native'
import { observer } from 'mobx-react'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import { useStores, useStyles } from '~/hooks'
import { ListItem } from '~/components'

import styles from './styles'

const TaskDetailScreen = ({ taskType, task }) => {
  const { upcomingStore, todayStore, doneStore } = useStores()
  const classes = useStyles(styles)

  const storeMap = {
    upcoming: upcomingStore,
    today: todayStore,
    done: doneStore,
  }
  const store = storeMap[taskType]

  const [originalValue, setOriginalValue] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    if (task) {
      setOriginalValue(task.name)
      setValue(task.name)
    }
  }, [])

  useEffect(() => {
    if (!value.trim()) return
    store.updateTask(task.id, { name: value })
  }, [value])

  useEffect(() => {
    if (task) {
      setValue(task.name)
    }
  }, [task])

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
            store.removeTask(task.id)
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

TaskDetailScreen.propTypes = {
  taskType: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
}

export default observer(TaskDetailScreen)
