import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import { useStyles } from '~/hooks'

import styles from './styles'

const BackButton = () => {
  const classes = useStyles(styles)

  const onPress = () => {
    Actions.pop()
  }

  return (
    <TouchableOpacity
      style={classes.iconContainer}
      onPress={onPress}
    >
      <Icon
        type="feather"
        name="arrow-left"
        size={22}
      />
    </TouchableOpacity>
  )
}

export default BackButton
