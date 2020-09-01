import React from 'react'
import { View } from 'react-native'

import { useStyles } from '~/hooks'

import styles from './styles'

const SettingsScreen = () => {
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
    </View>
  )
}

export default SettingsScreen
