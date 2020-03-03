import React from 'react'
import {
  Router,
  Modal,
  Overlay,
  Lightbox,
  Tabs,
  Stack,
  Scene,
  ActionConst,
} from 'react-native-router-flux'

import {
  AppLoadingScreen,
  TasksUpcomingScreen,
  TasksTodayScreen,
  TasksDoneScreen,
  TaskAddScreen,
} from '~/screens'
import { TabBar, ActionBar } from '~/containers'

const AppRouter = () => {
  return (
    <Router>
      <Modal hideNavBar>
        <Scene
          initial
          key="loading"
          component={AppLoadingScreen}
        />
        <Lightbox
          key="home"
          type={ActionConst.REPLACE}
        >
          <Overlay>
            <Tabs
              tabBarPosition="top"
              tabBarComponent={TabBar}
            >
              <Stack
                key="upcoming"
                hideNavBar
              >
                <Scene component={TasksUpcomingScreen} />
              </Stack>
              <Stack
                initial
                key="today"
                hideNavBar
              >
                <Scene component={TasksTodayScreen} />
              </Stack>
              <Stack
                key="doneStack"
                title="Done"
                hideNavBar
              >
                <Scene component={TasksDoneScreen} />
              </Stack>
            </Tabs>
            <Scene component={ActionBar} />
          </Overlay>
          <Scene
            key="addTask"
            component={TaskAddScreen}
          />
        </Lightbox>
      </Modal>
    </Router>
  )
}

export default AppRouter
