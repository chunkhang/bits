import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

import HomeScreen from '../../screens/HomeScreen'

const RootRouter = () => {
  return (
    <Router>
      <Stack hideNavBar>
        <Scene
          key="home"
          component={HomeScreen}
        />
      </Stack>
    </Router>
  )
}

export default RootRouter
