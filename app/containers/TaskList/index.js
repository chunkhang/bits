import React, { useState } from 'react'
import { ScrollView, Animated } from 'react-native'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { useStores, useTheme, useStyles } from '~/hooks'
import { ListItem } from '~/components'

import styles from './styles'

const TaskList = () => {
  const { taskStore } = useStores()
  const theme = useTheme()
  const classes = useStyles(styles)

  // TODO: Use PanResponder
  // https://reactnative.dev/docs/panresponder
  // https://medium.com/handlebar-labs/intro-to-gestures-in-react-native-e9b63dd3305

  const [threshold] = useState(72)
  const [initialOpacity] = useState(0.25)
  const [finalOpacity] = useState(1)

  const renderLeftActions = (progress, dragX) => {
    const opacity = dragX.interpolate({
      inputRange: [0, threshold - 1, threshold],
      outputRange: [initialOpacity, initialOpacity, finalOpacity],
      extrapolate: 'clamp',
    })
    return (
      <Animated.View
        style={[
          classes.leftSwipeContainer,
          { opacity },
        ]}
      />
    )
  }

  const renderRightActions = (progress, dragX) => {
    const opacity = dragX.interpolate({
      inputRange: [-threshold, 1 - threshold, 0],
      outputRange: [finalOpacity, initialOpacity, initialOpacity],
      extrapolate: 'clamp',
    })
    return (
      <Animated.View
        style={[
          classes.rightSwipeContainer,
          { opacity },
        ]}
      />
    )
  }

  const onSwipeableLeftOpen = (task) => {
    console.tron.logImportant(task.id)
    Actions.doneTasks()
  }

  const onSwipeableRightOpen = (task) => {
    console.tron.logImportant(task.id)
    Actions.upcomingTasks()
  }

  const onPress = (task) => {
    taskStore.selectTask(task.id)
    Actions.taskDetail()
  }

  return (
    <ScrollView style={classes.mainContainer}>
      {taskStore.tasks.map((task) => {
        return (
          <Swipeable
            key={task.id}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            leftThreshold={threshold}
            rightThreshold={threshold}
            onSwipeableLeftOpen={() => {
              onSwipeableLeftOpen(task)
            }}
            onSwipeableRightOpen={() => {
              onSwipeableRightOpen(task)
            }}
          >
            <ListItem
              value={task.name}
              onPress={() => {
                onPress(task)
              }}
              color={theme.colors.yellow}
            />
          </Swipeable>
        )
      })}
    </ScrollView>
  )
}

export default observer(TaskList)
