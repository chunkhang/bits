import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text } from 'react-native-elements'

const TaskItem = ({ task }) => {
  return (
    <View style={{ backgroundColor: 'red', height: 20 }}>
      <Text>{task.name}</Text>
    </View>
  )
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
}

export default TaskItem
