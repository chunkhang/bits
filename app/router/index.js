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
import { TabBar, NavBar } from '~/containers'
import rootStore from '~/stores'

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
                tabBarPosition="bottom"
                tabBarComponent={TabBar}
                swipeEnabled={false}
              >
                <Stack
                  key="upcomingTasks"
                  navBar={NavBar}
                  title="Upcoming"
                  hideBackButton
                >
                  <Scene
                    component={TasksUpcomingScreen}
                    onEnter={() => {
                      rootStore.layoutStore.setTab(0)
                    }}
                  />
                </Stack>
                <Stack
                  initial
                  key="todayTasks"
                  navBar={NavBar}
                  title="Today"
                  hideBackButton
                >
                  <Scene
                    component={TasksTodayScreen}
                    onEnter={() => {
                      rootStore.layoutStore.setTab(1)
                    }}
                  />
                </Stack>
                <Stack
                  key="doneTasks"
                  navBar={NavBar}
                  title="Done"
                  hideBackButton
                >
                  <Scene
                    component={TasksDoneScreen}
                    onEnter={() => {
                      rootStore.layoutStore.setTab(2)
                    }}
                  />
                </Stack>
              </Tabs>
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
