import React from 'react'
import {
  Router,
  Overlay,
  Modal,
  Tabs,
  Stack,
  Scene,
  ActionConst,
} from 'react-native-router-flux'

import {
  LoadingScreen,
  UpcomingScreen,
  TodayScreen,
  DoneScreen,
} from '~/screens'
import { TabBar, ActionBar } from '~/components'

const AppRouter = () => {
  return (
    <Router>
      <Modal hideNavBar>

        <Scene
          initial
          key="loading"
          component={LoadingScreen}
        />

        <Overlay
          key="home"
          type={ActionConst.REPLACE}
        >
          <Tabs
            tabBarPosition="top"
            tabBarComponent={TabBar}
          >
            <Stack
              key="upcoming"
              hideNavBar
            >
              <Scene component={UpcomingScreen} />
            </Stack>

            <Stack
              initial
              key="today"
              hideNavBar
            >
              <Scene component={TodayScreen} />
            </Stack>

            <Stack
              key="doneStack"
              title="Done"
              hideNavBar
            >
              <Scene component={DoneScreen} />
            </Stack>

          </Tabs>

          <Scene component={ActionBar} />
        </Overlay>
      </Modal>
    </Router>
  )
}

export default AppRouter
