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

import LoadingScreen from '~/screens/LoadingScreen'
import UpcomingScreen from '~/screens/UpcomingScreen'
import TodayScreen from '~/screens/TodayScreen'
import DoneScreen from '~/screens/DoneScreen'

const AppRouter = () => {
  return (
    <Router>
      <Overlay key="overlay">
        <Modal key="modal" hideNavBar>

          <Scene
            initial
            key="loadingScreen"
            component={LoadingScreen}
          />

          <Tabs
            key="tabs"
            tabBarPosition="top"
            type={ActionConst.REPLACE}
          >

            <Stack
              key="upcomingStack"
              title="Upcoming"
              hideNavBar
            >
              <Scene
                key="upcomingScreen"
                component={UpcomingScreen}
              />
            </Stack>

            <Stack
              initial
              key="todayStack"
              title="Today"
              hideNavBar
            >
              <Scene
                key="todayScreen"
                component={TodayScreen}
              />
            </Stack>

            <Stack
              key="doneStack"
              title="Done"
              hideNavBar
            >
              <Scene
                key="doneScreen"
                component={DoneScreen}
              />
            </Stack>

          </Tabs>

        </Modal>
      </Overlay>
    </Router>
  )
}

export default AppRouter
