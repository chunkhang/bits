import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { useDynamicValue } from 'react-native-dynamic'

import { useStyles, useTheme } from '~/hooks'

import styles from './styles'

const SettingsButton = () => {
  const classes = useStyles(styles)
  const theme = useTheme()

  const color = useDynamicValue(theme.dynamics.foreground)

  const onPress = () => {
    Actions.settingsScreen()
  }

  return (
    <TouchableOpacity
      style={classes.iconContainer}
      onPress={onPress}
      hitSlop={{
        left: 20,
        right: 20,
        top: 10,
        bottom: 10,
      }}
    >
      <Icon
        type="feather"
        name="settings"
        size={20}
        color={color}
      />
    </TouchableOpacity>
  )
}

export default SettingsButton
