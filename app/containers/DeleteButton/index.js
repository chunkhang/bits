import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import { useStyles, useStores } from '~/hooks'

import styles from './styles'

const DeleteButton = () => {
  const classes = useStyles(styles)
  const { layoutStore } = useStores()

  const onPress = () => {
    layoutStore.deleteCallback()
  }

  return (
    <TouchableOpacity
      style={classes.iconContainer}
      onPress={onPress}
    >
      <Icon
        type="feather"
        name="trash-2"
        size={20}
      />
    </TouchableOpacity>
  )
}

export default DeleteButton
