import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { Input } from 'react-native-elements'
import I18n from 'i18n-js'

import { useStyles, useStores } from '~/hooks'
import utils from '~/utils'

import styles from './styles'

const TaskDetailScreen = ({
  color,
  task,
  onUpdate,
  onRemove,
}) => {
  const classes = useStyles(styles)
  const { layoutStore } = useStores()

  useEffect(() => {
    layoutStore.onDelete(() => {
      utils.confirmAlert({
        title: I18n.t('alert.deleteTask.title'),
        message: I18n.t('alert.deleteTask.message'),
        confirm: I18n.t('alert.deleteTask.confirm'),
        onConfirm: () => {
          onRemove(task)
        },
        destructive: true,
      })
    })
  }, [])

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

  return (
    <TouchableWithoutFeedback onPress={onPressBackground}>
      <View style={classes.mainContainer}>
        <View style={classes.itemContainer}>
          <View style={[classes.dot, { backgroundColor: color }]} />
          <Input
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            returnKeyType="done"
            containerStyle={classes.containerStyle}
            inputContainerStyle={classes.inputContainerStyle}
            inputStyle={classes.inputStyle}
          />
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
