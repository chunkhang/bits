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

import SettingsScreen from '~/screens/SettingsScreen'
import UpcomingTasksScreen from '~/screens/UpcomingTasksScreen'
import TodayTasksScreen from '~/screens/TodayTasksScreen'
import DoneTasksScreen from '~/screens/DoneTasksScreen'
import AddTaskScreen from '~/screens/AddTaskScreen'
import TaskDetailScreen from '~/screens/TaskDetailScreen'

import TabBar from '~/containers/TabBar'
import NavBar from '~/containers/NavBar'
import BackButton from '~/containers/BackButton'
import CloseButton from '~/containers/CloseButton'
import SettingsButton from '~/containers/SettingsButton'
import DeleteButton from '~/containers/DeleteButton'
import ClearButton from '~/containers/ClearButton'

const AppRouter = () => {
  return (
    <Router>
      <Modal>
        <Lightbox
          key="homeScreen"
          type={ActionConst.REPLACE}
          hideNavBar
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
                  navBarNodes={{
                    leftNode: <SettingsButton />,
                  }}
                >
                  <Scene component={UpcomingTasksScreen} />
                </Stack>
                <Stack
                  initial
                  key="todayTasksScreen"
                  title={I18n.t('screen.todayTasks.title')}
                  navBar={NavBar}
                  navBarNodes={{
                    leftNode: <SettingsButton />,
                  }}
                >
                  <Scene component={TodayTasksScreen} />
                </Stack>
                <Stack
                  key="doneTasksScreen"
                  title={I18n.t('screen.doneTasks.title')}
                  navBar={NavBar}
                  navBarNodes={{
                    leftNode: <SettingsButton />,
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
        <Scene
          key="settingsScreen"
          component={SettingsScreen}
          title={I18n.t('screen.settings.title')}
          navBar={NavBar}
          navBarNodes={{
            leftNode: <CloseButton />,
          }}
        />
      </Modal>
    </Router>
  )
}

export default AppRouter
