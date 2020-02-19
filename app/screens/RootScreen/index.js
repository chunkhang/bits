import React from 'react'
import { SafeAreaView } from 'react-native'

import RootRouter from '~/routers/RootRouter'

import styles from './styles'

const RootScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <RootRouter />
    </SafeAreaView>
  )
}

export default RootScreen
