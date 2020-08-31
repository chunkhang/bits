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
import I18n from 'i18n-js'

import {
  AppLoadingScreen,
  TasksUpcomingScreen,
  TasksTodayScreen,
  TasksDoneScreen,
  TaskAddScreen,
  TaskDetailScreen,
} from '~/screens'
import { TabBar, NavBar } from '~/containers'

const AppRouter = () => {
  return (
    <Router>
      <Modal hideNavBar>
        <Scene
          initial
          key="loadingScreen"
          component={AppLoadingScreen}
        />
        <Lightbox
          key="homeScreen"
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
                  key="upcomingTasksScreen"
                  navBar={NavBar}
                  title={I18n.t('screen.upcomingTasks.title')}
                  hideBackButton
                >
                  <Scene component={TasksUpcomingScreen} />
                </Stack>
                <Stack
                  initial
                  key="todayTasksScreen"
                  navBar={NavBar}
                  title={I18n.t('screen.todayTasks.title')}
                  hideBackButton
                >
                  <Scene component={TasksTodayScreen} />
                </Stack>
                <Stack
                  key="doneTasksScreen"
                  navBar={NavBar}
                  title={I18n.t('screen.doneTasks.title')}
                  hideBackButton
                >
                  <Scene component={TasksDoneScreen} />
                </Stack>
              </Tabs>
            </Overlay>
            <Scene
              key="taskDetailScreen"
              component={TaskDetailScreen}
              navBar={NavBar}
              title={I18n.t('screen.taskDetail.title')}
            />
          </Stack>
          <Scene
            key="addTaskScreen"
            component={TaskAddScreen}
            title={I18n.t('screen.addTask.title')}
          />
        </Lightbox>
      </Modal>
    </Router>
  )
}

export default AppRouter
