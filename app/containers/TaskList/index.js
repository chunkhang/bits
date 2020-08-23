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

import { useStores, useTheme, useStyles, usePrevious } from '~/hooks'
import { ListItem } from '~/components'

import styles from './styles'

const TaskItem = observer(({ task }) => {
  const { taskStore } = useStores()
  const theme = useTheme()
  const classes = useStyles(styles)
  const window = useWindowDimensions()

  const [backgroundColor, setBackgroundColor] = useState(null)
  const [opacity, setOpacity] = useState(null)

  const swipeHandlerMap = {
    upcoming: {
      left: () => null,
      right: () => {
        taskStore.updateTask(task.id, { type: 'today' })
      },
    },
    today: {
      left: () => {
        taskStore.updateTask(task.id, { type: 'upcoming' })
      },
      right: () => {
        taskStore.updateTask(task.id, { type: 'done' })
      },
    },
    done: {
      left: () => {
        taskStore.updateTask(task.id, { type: 'today' })
      },
      right: () => null,
    },
  }

  const onSwipeLeft = () => {
    const handler = swipeHandlerMap[task.type].left
    handler()
  }

  const onSwipeRight = () => {
    const handler = swipeHandlerMap[task.type].right
    handler()
  }

  const onPress = () => {
    taskStore.selectTask(task.id)
    Actions.taskDetail()
  }

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
      setBackgroundColor(theme.colors.green)
      if (exceedThreshold && deltaX > 0) {
        shouldPop = true
      }
    } else {
      setBackgroundColor(theme.colors.red)
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
            onSwipeRight()
          } else {
            onSwipeLeft()
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

const TaskList = ({ type }) => {
  const { taskStore } = useStores()
  const classes = useStyles(styles)

  const tasks = taskStore.tasks.filter((task) => {
    return task.type === type
  })

  return (
    <FlatList
      style={classes.mainContainer}
      data={tasks}
      renderItem={({ item }) => (
        <TaskItem task={item} />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

TaskList.propTypes = {
  type: PropTypes.string.isRequired,
}

export default observer(TaskList)
