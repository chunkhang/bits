import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text } from 'react-native-elements'

import { useStyles } from '~/hooks'

import styles from './styles'

const TaskItem = ({ task, containerStyle }) => {
  const classes = useStyles(styles)

  return (
    <View
      style={[
        classes.mainContainer,
        containerStyle,
      ]}
    >
      <View style={classes.dot} />
      <Text style={classes.text}>{task.name}</Text>
    </View>
  )
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  containerStyle: PropTypes.object.isRequired,
}

export default TaskItem
