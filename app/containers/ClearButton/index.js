import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import { useStyles, useStores } from '~/hooks'

import styles from './styles'

const ClearButton = () => {
  const classes = useStyles(styles)
  const { layoutStore } = useStores()

  const onPress = () => {
    layoutStore.clearCallback()
  }

  return (
    <TouchableOpacity
      style={classes.iconContainer}
      onPress={onPress}
    >
      <Icon
        type="feather"
        name="archive"
        size={20}
      />
    </TouchableOpacity>
  )
}

export default ClearButton
