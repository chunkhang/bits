import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from 'react-native'
import { Icon } from 'react-native-elements'

import { useStyles } from '~/hooks'
import { ListItem } from '~/components'

import styles from './styles'

const TaskDetailScreen = ({
  color,
  task,
  onUpdate,
  onRemove,
}) => {
  const classes = useStyles(styles)

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
    onUpdate(task, { name: value })
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

  const onPressBackground = () => {
    Keyboard.dismiss()
  }

  const onPressTrash = () => {
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
            onRemove(task)
          },
        },
      ],
    )
  }

  return (
    <TouchableWithoutFeedback onPress={onPressBackground}>
      <View style={classes.mainContainer}>
        <ListItem
          editable
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          color={color}
        />
        <View style={classes.actionContainer}>
          <TouchableOpacity onPress={onPressTrash}>
            <Icon
              name="trash-2"
              type="feather"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

TaskDetailScreen.propTypes = {
  color: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
  onRemove: PropTypes.func,
}

TaskDetailScreen.defaultProps = {
  onUpdate: () => null,
  onRemove: () => null,
}

export default TaskDetailScreen
