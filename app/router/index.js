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
  TaskDetailScreen,
} from '~/screens'
import { TabBar, NavBar, ActionBar } from '~/containers'

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
          <Stack headerMode="screen">
            <Overlay hideNavBar>
              <Tabs
                tabBarPosition="top"
                tabBarComponent={TabBar}
              >
                <Stack
                  key="upcomingTasks"
                  hideNavBar
                >
                  <Scene component={TasksUpcomingScreen} />
                </Stack>
                <Stack
                  initial
                  key="todayTasks"
                  hideNavBar
                >
                  <Scene component={TasksTodayScreen} />
                </Stack>
                <Stack
                  key="doneTasks"
                  hideNavBar
                >
                  <Scene component={TasksDoneScreen} />
                </Stack>
              </Tabs>
              <Scene component={ActionBar} />
            </Overlay>
            <Scene
              key="taskDetail"
              component={TaskDetailScreen}
              navBar={NavBar}
              title="Task"
            />
          </Stack>
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
