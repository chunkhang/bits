import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { useStyles } from '~/hooks'

import styles from './styles'

const AppLoadingScreen = () => {
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
      <ActivityIndicator />
    </View>
  )
}

export default AppLoadingScreen
