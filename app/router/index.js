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
  UpcomingTasksScreen,
  TodayTasksScreen,
  DoneTasksScreen,
  AddTaskScreen,
  TaskDetailScreen,
} from '~/screens'
import {
  TabBar,
  NavBar,
  BackButton,
  DeleteButton,
  ClearButton,
} from '~/containers'

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
                  title={I18n.t('screen.upcomingTasks.title')}
                  navBar={NavBar}
                >
                  <Scene component={UpcomingTasksScreen} />
                </Stack>
                <Stack
                  initial
                  key="todayTasksScreen"
                  title={I18n.t('screen.todayTasks.title')}
                  navBar={NavBar}
                >
                  <Scene component={TodayTasksScreen} />
                </Stack>
                <Stack
                  key="doneTasksScreen"
                  title={I18n.t('screen.doneTasks.title')}
                  navBar={NavBar}
                  navBarNodes={{
                    rightNode: <ClearButton />,
                  }}
                >
                  <Scene component={DoneTasksScreen} />
                </Stack>
              </Tabs>
            </Overlay>
            <Scene
              key="taskDetailScreen"
              component={TaskDetailScreen}
              title={I18n.t('screen.taskDetail.title')}
              navBar={NavBar}
              navBarNodes={{
                leftNode: <BackButton />,
                rightNode: <DeleteButton />,
              }}
            />
          </Stack>
          <Scene
            key="addTaskScreen"
            component={AddTaskScreen}
            title={I18n.t('screen.addTask.title')}
          />
        </Lightbox>
      </Modal>
    </Router>
  )
}

export default AppRouter
