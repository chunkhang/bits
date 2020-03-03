import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-elements'

import { useStyles } from '~/hooks'

import styles from './styles'

const TaskItem = ({
  task,
  containerStyle,
  onPress,
}) => {
  const classes = useStyles(styles)

  return (
    <TouchableOpacity
      style={[
        classes.mainContainer,
        containerStyle,
      ]}
      onPress={onPress}
    >
      <View style={classes.dot} />
      <Text style={classes.text}>{task.name}</Text>
    </TouchableOpacity>
  )
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  containerStyle: PropTypes.object.isRequired,
  onPress: PropTypes.func,
}

TaskItem.defaultProps = {
  onPress: () => null,
}

export default TaskItem
