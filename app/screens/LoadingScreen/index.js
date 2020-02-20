import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { useStyles } from '~/hooks'

import styles from './styles'

const LoadingScreen = () => {
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
      <ActivityIndicator />
    </View>
  )
}

export default LoadingScreen
