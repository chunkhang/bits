import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useDynamicValue } from 'react-native-dynamic'

import { useStyles, useStores, useTheme } from '~/hooks'

import styles from './styles'

const ClearButton = () => {
  const classes = useStyles(styles)
  const { layoutStore } = useStores()
  const theme = useTheme()

  const color = useDynamicValue(theme.dynamics.foreground)

  const onPress = () => {
    layoutStore.clearCallback()
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
        name="archive"
        size={20}
        color={color}
      />
    </TouchableOpacity>
  )
}

export default ClearButton
