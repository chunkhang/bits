import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  FlatList,
  PanResponder,
  Animated,
  useWindowDimensions,
} from 'react-native'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import {
  useStores,
  useTheme,
  useStyles,
  usePrevious,
  useTrackingRef,
} from '~/hooks'
import { ListItem } from '~/components'

import styles from './styles'

const TaskItem = observer(({ taskType, task }) => {
  const theme = useTheme()
  const classes = useStyles(styles)
  const window = useWindowDimensions()
  const { upcomingStore, todayStore, doneStore } = useStores()

  /* Swipe config */

  const swipeMap = {
    upcoming: {
      left: {
        enabled: false,
        color: null,
        handler: () => null,
      },
      right: {
        enabled: true,
        color: theme.colors.yellow,
        handler: () => {
          upcomingStore.removeTask(task.id)
          todayStore.addTask(task)
        },
      },
    },
    today: {
      left: {
        enabled: true,
        color: theme.colors.red,
        handler: () => {
          todayStore.removeTask(task.id)
          upcomingStore.addTask(task)
        },
      },
      right: {
        enabled: true,
        color: theme.colors.green,
        handler: () => {
          todayStore.removeTask(task.id)
          doneStore.addTask(task)
        },
      },
    },
    done: {
      left: {
        enabled: true,
        color: theme.colors.yellow,
        handler: () => {
          doneStore.removeTask(task.id)
          todayStore.addTask(task)
        },
      },
      right: {
        enabled: false,
        color: null,
        handler: () => null,
      },
    },
  }

  const swipe = swipeMap[taskType]

  /* Swipe logic */

  // How much distance to drag before popping and handling swipe
  const [popThreshold] = useState(64)

  // How much distance can be dragged for disabled swipe
  const [disabledThreshold] = useState(20)

  // Horizontal translation of view
  const [pan] = useState(new Animated.Value(0))

  // Track current and previous x position
  const [currentDx, setCurrentDx] = useState(0)
  const prevDx = usePrevious(currentDx)

  // Swipe state
  const [swipingRight, setSwipingRight] = useState(false)
  const [shouldPop, setShouldPop] = useState(false)

  // Styles to apply based on swipe state
  const [backgroundColor, setBackgroundColor] = useState(null)
  const [opacity, setOpacity] = useState(null)

  useEffect(() => {
    let swipeEnabled = true
    // Determine swipe direction
    const newSwipingRight = currentDx > 0
    if (newSwipingRight && swipe.right.enabled) {
      setBackgroundColor(swipe.right.color)
    } else if (!newSwipingRight && swipe.left.enabled) {
      setBackgroundColor(swipe.left.color)
    } else {
      setBackgroundColor(null)
      swipeEnabled = false
    }
    // Determine whether should pop or not
    const deltaDx = currentDx - prevDx
    const exceedThreshold = Math.abs(currentDx) >= popThreshold
    const newShouldPop = swipeEnabled && exceedThreshold && (
      // Must be swiping in the correct direction
      newSwipingRight ? deltaDx > 0 : deltaDx < 0
    )
    if (newShouldPop) {
      setOpacity(1)
    } else {
      setOpacity(theme.globals.blurOpacity)
    }
    // Apply horizontal translation
    // If swipe is disabled, we allow limited movement
    if (swipeEnabled || Math.abs(currentDx) <= disabledThreshold) {
      pan.setValue(currentDx)
    }
    setSwipingRight(newSwipingRight)
    setShouldPop(newShouldPop)
  }, [currentDx])

  /* Pan responder */

  // All changing values must be ref
  const swipeRef = useTrackingRef(swipe)
  const swipingRightRef = useTrackingRef(swipingRight)
  const shouldPopRef = useTrackingRef(shouldPop)

  const [panResponder] = useState(PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => {
      // Only interested in horizontal movement
      const { dx, dy } = gestureState
      return Math.abs(dx) > Math.abs(dy)
    },
    onPanResponderMove: (event, gestureState) => {
      const { dx } = gestureState
      setCurrentDx(dx)
    },
    onPanResponderRelease: () => {
      const restSpeedThreshold = 20
      const restDisplacementThreshold = 20
      // Animate pop
      if (shouldPopRef.current) {
        Animated.spring(pan, {
          toValue: swipingRightRef.current ? window.width : -window.width,
          restSpeedThreshold,
          restDisplacementThreshold,
          useNativeDriver: true,
        }).start(() => {
          // Handle swipe after pop
          if (swipingRightRef.current) {
            swipeRef.current.right.handler()
          } else {
            swipeRef.current.left.handler()
          }
        })
        return
      }
      // Animate back to original state
      Animated.spring(pan, {
        toValue: 0,
        restSpeedThreshold,
        restDisplacementThreshold,
        useNativeDriver: true,
      }).start()
    },
  }))

  // Press handler

  const onPress = () => {
    Actions.taskDetailScreen({ taskType, task })
  }

  return (
    <View style={{ position: 'relative' }}>
      <Animated.View
        style={{
          transform: [
            { translateX: pan },
          ],
        }}
        {...panResponder.panHandlers}
      >
        <ListItem
          value={task.name}
          onPress={onPress}
        />
      </Animated.View>
      <View
        style={[
          classes.swipeBackground,
          { backgroundColor, opacity },
        ]}
      />
    </View>
  )
})

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
}

const TaskList = ({ taskType }) => {
  const { upcomingStore, todayStore, doneStore } = useStores()
  const classes = useStyles(styles)

  const tasksMap = {
    upcoming: upcomingStore.tasks,
    today: todayStore.tasks,
    done: doneStore.tasks,
  }
  const tasks = tasksMap[taskType]

  return (
    <FlatList
      style={classes.mainContainer}
      data={tasks.slice()}
      renderItem={({ item }) => (
        <TaskItem
          taskType={taskType}
          task={item}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

TaskList.propTypes = {
  taskType: PropTypes.string.isRequired,
}

export default observer(TaskList)
