import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  PanResponder,
  Animated,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'
import SortableList from 'react-native-sortable-list'

import {
  useTheme,
  useStyles,
  usePrevious,
  useTrackingRef,
} from '~/hooks'
import { BeepSound } from '~/assets/sounds'

import styles from './styles'

const TaskItem = ({
  color,
  task,
  onPress: propsOnPress,
  sorting,
  setSorting,
  rowActive,
  toggleRowActive,
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

  /* Swiping */

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
  const [swipeColor, setSwipeColor] = useState(null)
  const [swipeOpacity, setSwipeOpacity] = useState(null)

  useEffect(() => {
    if (!currentDx || !prevDx) return
    // Determine swipe direction
    const newSwipingRight = currentDx > 0
    if (newSwipingRight) {
      if (!swipeRightEnabled) return
      setSwipeColor(swipeRightColor)
    } else {
      if (!swipeLeftEnabled) return
      setSwipeColor(swipeLeftColor)
    }
    // Determine whether should pop or not
    const deltaDx = currentDx - prevDx
    const exceedThreshold = Math.abs(currentDx) >= popThreshold
    const newShouldPop = exceedThreshold && (
      // Must be swiping in the correct direction
      newSwipingRight ? deltaDx > 0 : deltaDx < 0
    )
    if (newShouldPop) {
      setSwipeOpacity(1)
    } else {
      setSwipeOpacity(theme.globals.blurOpacity)
    }
    // Apply horizontal translation
    pan.setValue(currentDx)
    setSwipingRight(newSwipingRight)
    setShouldPop(newShouldPop)
  }, [currentDx])

  // All changing values must be ref
  const taskRef = useTrackingRef(task)
  const sortingRef = useTrackingRef(sorting)
  const onSwipeLeftRef = useTrackingRef(onSwipeLeft)
  const onSwipeRightRef = useTrackingRef(onSwipeRight)
  const swipingRightRef = useTrackingRef(swipingRight)
  const shouldPopRef = useTrackingRef(shouldPop)

  const [panResponder] = useState(PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => {
      return (
        // Only when not sorting
        !sortingRef.current &&
        // Only interested in horizontal movement
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
      )
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

  /* Sorting */

  // Start sorting the list
  // Set this item as the active row being dragged around
  const onLongPress = () => {
    setSorting(true)
    if (toggleRowActive) {
      toggleRowActive()
    }
  }

  // If somehow sorting failed to stop, use press to stop it
  // Otherwise, press the item as usual
  const onPress = () => {
    if (sorting) {
      setSorting(false)
    } else {
      propsOnPress(task)
    }
  }

  // Reset swipe state when sorting starts
  useEffect(() => {
    if (sorting) {
      setSwipeColor(null)
      setSwipeOpacity(null)
    }
  }, [sorting])

  // Blur the item if the list is being sorted, but this
  // is not the item being dragged around
  const [itemOpacity, setItemOpacity] = useState(null)
  useEffect(() => {
    if (sorting && !rowActive) {
      setItemOpacity(theme.globals.blurOpacity)
    } else {
      setItemOpacity(null)
    }
  }, [sorting, rowActive])

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
        <TouchableWithoutFeedback
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <View
            style={[
              classes.item,
              { opacity: itemOpacity },
            ]}
          >
            <View
              style={[
                classes.dot,
                { backgroundColor: color },
              ]}
            />
            <View style={classes.textContainer}>
              <Text style={classes.text}>
                {task.name}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
      <View
        style={[
          classes.swipeBackground,
          { backgroundColor: swipeColor, opacity: swipeOpacity },
        ]}
      />
    </View>
  )
}

TaskItem.propTypes = {
  color: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  sorting: PropTypes.bool,
  setSorting: PropTypes.func,
  rowActive: PropTypes.bool,
  toggleRowActive: PropTypes.func,
  swipeLeftEnabled: PropTypes.bool,
  swipeLeftColor: PropTypes.string,
  onSwipeLeft: PropTypes.func,
  swipeRightEnabled: PropTypes.bool,
  swipeRightColor: PropTypes.string,
  onSwipeRight: PropTypes.func,
}

TaskItem.defaultProps = {
  onPress: () => null,
  sorting: false,
  setSorting: () => null,
  rowActive: false,
  toggleRowActive: () => null,
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
  const theme = useTheme()

  const [sorting, setSorting] = useState(false)

  const onActivateRow = () => {
    console.log('activate...')
  }

  const onReleaseRow = () => {
    setSorting(false)
  }

  const onChangeOrder = () => {
    BeepSound.stop()
    BeepSound.play()
  }

  return (
    <View style={classes.mainContainer}>
      <SortableList
        style={classes.list}
        data={tasks}
        autoscrollAreaSize={theme.globals.taskItemHeight}
        manuallyActivateRows
        onActivateRow={onActivateRow}
        onReleaseRow={onReleaseRow}
        onChangeOrder={onChangeOrder}
        renderRow={({ data, active }) => {
          return (
            <TaskItem
              color={color}
              task={data}
              onPress={onPressItem}
              setSorting={setSorting}
              sorting={sorting}
              rowActive={active}
              swipeLeftEnabled={swipeLeftEnabled}
              swipeLeftColor={swipeLeftColor}
              onSwipeLeft={onSwipeLeft}
              swipeRightEnabled={swipeRightEnabled}
              swipeRightColor={swipeRightColor}
              onSwipeRight={onSwipeRight}
            />
          )
        }}
      />
    </View>
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
