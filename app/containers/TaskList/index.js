import React, { useState, useEffect, useRef } from 'react'
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

  const [backgroundColor, setBackgroundColor] = useState(null)
  const [opacity, setOpacity] = useState(null)

  const [swipe, setSwipe] = useState({
    left: {
      color: null,
      handler: () => null,
    },
    right: {
      color: null,
      handler: () => null,
    },
  })
  const [swipeMap] = useState({
    upcoming: {
      left: {
        color: null,
        handler: () => null,
      },
      right: {
        color: theme.colors.yellow,
        handler: () => {
          upcomingStore.removeTask(task.id)
          todayStore.addTask(task)
        },
      },
    },
    today: {
      left: {
        color: theme.colors.red,
        handler: () => {
          todayStore.removeTask(task.id)
          upcomingStore.addTask(task)
        },
      },
      right: {
        color: theme.colors.green,
        handler: () => {
          todayStore.removeTask(task.id)
          doneStore.addTask(task)
        },
      },
    },
    done: {
      left: {
        color: theme.colors.yellow,
        handler: () => {
          doneStore.removeTask(task.id)
          todayStore.addTask(task)
        },
      },
      right: {
        color: null,
        handler: () => null,
      },
    },
  })
  useEffect(() => {
    setSwipe(swipeMap[taskType])
  }, [taskType])

  const [currentDx, setCurrentDx] = useState(0)
  const prevDx = usePrevious(currentDx)

  const [popThreshold] = useState(80)
  const swipingRightRef = useRef(false)
  const shouldPopRef = useRef(false)
  useEffect(() => {
    const deltaX = currentDx - prevDx
    const swipingRight = currentDx > 0
    const exceedThreshold = Math.abs(currentDx) >= popThreshold
    let shouldPop = false
    if (swipingRight) {
      setBackgroundColor(swipe.right.color)
      if (exceedThreshold && deltaX > 0) {
        shouldPop = true
      }
    } else {
      setBackgroundColor(swipe.left.color)
      if (exceedThreshold && deltaX < 0) {
        shouldPop = true
      }
    }
    if (shouldPop) {
      setOpacity(1)
    } else {
      setOpacity(0.25)
    }
    swipingRightRef.current = swipingRight
    shouldPopRef.current = shouldPop
  }, [currentDx])

  const swipeRef = useTrackingRef(swipe)

  const [pan] = useState(new Animated.Value(0))
  const [panResponder] = useState(PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => {
      const { dx, dy } = gestureState
      return (Math.abs(dx) > Math.abs(dy))
    },
    onPanResponderMove: (event, gestureState) => {
      const { dx } = gestureState
      pan.setValue(dx)
      setCurrentDx(dx)
    },
    onPanResponderRelease: () => {
      const restSpeedThreshold = 20
      const restDisplacementThreshold = 20
      if (shouldPopRef.current) {
        Animated.spring(pan, {
          toValue: swipingRightRef.current ? window.width : -window.width,
          restSpeedThreshold,
          restDisplacementThreshold,
          useNativeDriver: true,
        }).start(() => {
          if (swipingRightRef.current) {
            swipeRef.current.right.handler()
          } else {
            swipeRef.current.left.handler()
          }
        })
        return
      }
      Animated.spring(pan, {
        toValue: 0,
        restSpeedThreshold,
        restDisplacementThreshold,
        useNativeDriver: true,
      }).start()
    },
  }))

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
