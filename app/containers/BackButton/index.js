import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { useDynamicValue } from 'react-native-dynamic'

import { useStyles, useTheme } from '~/hooks'

import styles from './styles'

const BackButton = () => {
  const classes = useStyles(styles)
  const theme = useTheme()

  const color = useDynamicValue(theme.dynamics.foreground)

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
        color={color}
      />
    </TouchableOpacity>
  )
}

export default BackButton
