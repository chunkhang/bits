import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  FlatList,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { useStores, useTheme, useStyles, usePrevious } from '~/hooks'
import { ListItem } from '~/components'

import styles from './styles'

const { width } = Dimensions.get('window')

const TaskItem = ({ task }) => {
  const { taskStore } = useStores()
  const theme = useTheme()

  const [backgroundColor, setBackgroundColor] = useState(null)
  const [opacity, setOpacity] = useState(null)

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
          toValue: swipingRightRef.current ? width : -width,
          restSpeedThreshold,
          restDisplacementThreshold,
          useNativeDriver: true,
        }).start(() => {
          taskStore.removeTask(task.id)
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
    taskStore.selectTask(task.id)
    Actions.taskDetail()
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
          color={theme.colors.yellow}
        />
      </Animated.View>
      <View
        style={{
          backgroundColor,
          opacity,
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
    </View>
  )
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
}

const TaskList = () => {
  const { taskStore } = useStores()
  const classes = useStyles(styles)

  return (
    <FlatList
      style={classes.mainContainer}
      data={taskStore.tasks.slice()}
      renderItem={({ item }) => (
        <TaskItem task={item} />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

export default observer(TaskList)
