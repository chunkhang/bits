import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  FlatList,
  PanResponder,
  Animated,
  useWindowDimensions,
} from 'react-native'

import {
  useTheme,
  useStyles,
  usePrevious,
  useTrackingRef,
} from '~/hooks'
import { ListItem } from '~/components'

import styles from './styles'

const TaskItem = ({
  color,
  task,
  onPress,
  swipeLeftEnabled,
  swipeLeftColor,
  onSwipeLeft,
  swipeRightEnabled,
  swipeRightColor,
  onSwipeRight,
}) => {
  const classes = useStyles(styles)
  const theme = useTheme()
  const window = useWindowDimensions()

  // How much distance to drag before popping and handling swipe
  const [popThreshold] = useState(64)

  // Horizontal translation of view
  const [pan] = useState(new Animated.Value(0))

  // Track current and previous x position
  const [currentDx, setCurrentDx] = useState(null)
  const prevDx = usePrevious(currentDx)

  // Swipe state
  const [swipingRight, setSwipingRight] = useState(false)
  const [shouldPop, setShouldPop] = useState(false)

  // Styles to apply based on swipe state
  const [backgroundColor, setBackgroundColor] = useState(null)
  const [opacity, setOpacity] = useState(null)

  useEffect(() => {
    if (!currentDx || !prevDx) return
    // Determine swipe direction
    const newSwipingRight = currentDx > 0
    if (newSwipingRight) {
      if (!swipeRightEnabled) return
      setBackgroundColor(swipeRightColor)
    } else {
      if (!swipeLeftEnabled) return
      setBackgroundColor(swipeLeftColor)
    }
    // Determine whether should pop or not
    const deltaDx = currentDx - prevDx
    const exceedThreshold = Math.abs(currentDx) >= popThreshold
    const newShouldPop = exceedThreshold && (
      // Must be swiping in the correct direction
      newSwipingRight ? deltaDx > 0 : deltaDx < 0
    )
    if (newShouldPop) {
      setOpacity(1)
    } else {
      setOpacity(theme.globals.blurOpacity)
    }
    // Apply horizontal translation
    pan.setValue(currentDx)
    setSwipingRight(newSwipingRight)
    setShouldPop(newShouldPop)
  }, [currentDx])

  // All changing values must be ref
  const taskRef = useTrackingRef(task)
  const onSwipeLeftRef = useTrackingRef(onSwipeLeft)
  const onSwipeRightRef = useTrackingRef(onSwipeRight)
  const swipingRightRef = useTrackingRef(swipingRight)
  const shouldPopRef = useTrackingRef(shouldPop)

  const [panResponder] = useState(PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => {
      // Only interested in horizontal movement
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
    },
    onPanResponderMove: (event, gestureState) => {
      setCurrentDx(gestureState.dx)
    },
    onPanResponderRelease: () => {
      const restSpeedThreshold = 20
      const restDisplacementThreshold = 20
      if (shouldPopRef.current) {
        // Animate pop
        Animated.spring(pan, {
          toValue: swipingRightRef.current ? window.width : -window.width,
          restSpeedThreshold,
          restDisplacementThreshold,
          useNativeDriver: true,
        }).start(() => {
          // Handle swipe after pop
          setTimeout(() => {
            if (swipingRightRef.current) {
              onSwipeRightRef.current(taskRef.current)
            } else {
              onSwipeLeftRef.current(taskRef.current)
            }
          }, 0)
        })
      } else {
        // Animate back to original state
        Animated.spring(pan, {
          toValue: 0,
          restSpeedThreshold,
          restDisplacementThreshold,
          useNativeDriver: true,
        }).start()
      }
    },
  }))

  return (
    <View style={classes.itemContainer}>
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
          color={color}
          onPress={() => {
            onPress(task)
          }}
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
}

TaskItem.propTypes = {
  color: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  swipeLeftEnabled: PropTypes.bool,
  swipeLeftColor: PropTypes.string,
  onSwipeLeft: PropTypes.func,
  swipeRightEnabled: PropTypes.bool,
  swipeRightColor: PropTypes.string,
  onSwipeRight: PropTypes.func,
}

TaskItem.defaultProps = {
  onPress: () => null,
  swipeLeftEnabled: false,
  swipeLeftColor: null,
  onSwipeLeft: () => null,
  swipeRightEnabled: false,
  swipeRightColor: null,
  onSwipeRight: () => null,
}

const TaskList = ({
  color,
  tasks,
  onPressItem,
  swipeLeftEnabled,
  swipeLeftColor,
  onSwipeLeft,
  swipeRightEnabled,
  swipeRightColor,
  onSwipeRight,
}) => {
  const classes = useStyles(styles)

  return (
    <FlatList
      style={classes.mainContainer}
      data={tasks}
      renderItem={({ item }) => (
        <TaskItem
          color={color}
          task={item}
          onPress={onPressItem}
          swipeLeftEnabled={swipeLeftEnabled}
          swipeLeftColor={swipeLeftColor}
          onSwipeLeft={onSwipeLeft}
          swipeRightEnabled={swipeRightEnabled}
          swipeRightColor={swipeRightColor}
          onSwipeRight={onSwipeRight}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

TaskList.propTypes = {
  color: PropTypes.string.isRequired,
  tasks: PropTypes.array,
  onPressItem: PropTypes.func,
  swipeLeftEnabled: PropTypes.bool,
  swipeLeftColor: PropTypes.string,
  onSwipeLeft: PropTypes.func,
  swipeRightEnabled: PropTypes.bool,
  swipeRightColor: PropTypes.string,
  onSwipeRight: PropTypes.func,
}

TaskList.defaultProps = {
  tasks: [],
  onPressItem: () => null,
  swipeLeftEnabled: false,
  swipeLeftColor: null,
  onSwipeLeft: () => null,
  swipeRightEnabled: false,
  swipeRightColor: null,
  onSwipeRight: () => null,
}

export default TaskList
