import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import { useStyles, useStores } from '~/hooks'

import styles from './styles'

const SettingsButton = () => {
  const classes = useStyles(styles)
  const { layoutStore } = useStores()

  const onPress = () => {
    layoutStore.settingsCallback()
  }

  return (
    <TouchableOpacity
      style={classes.iconContainer}
      onPress={onPress}
    >
      <Icon
        type="feather"
        name="settings"
        size={20}
      />
    </TouchableOpacity>
  )
}

export default SettingsButton
