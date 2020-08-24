import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'
import { Button } from 'react-native-elements'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { useTheme, useStyles } from '~/hooks'
import { PlusIcon } from '~/components'

import styles from './styles'

const TabBar = ({ navigation }) => {
  const theme = useTheme()
  const classes = useStyles(styles)
  const window = useWindowDimensions()

  const navigateToTab = (i) => {
    if (i < 0 || i > navigation.state.routes.length - 1) return
    const route = navigation.state.routes[i]
    const navigate = Actions[route.key]
    navigate()
  }

  const [scrubIndex, setScrubIndex] = useState(navigation.state.index)
  useEffect(() => {
    setScrubIndex(navigation.state.index)
  }, [navigation.state.index])
  useEffect(() => {
    if (scrubIndex !== navigation.state.index) {
      navigateToTab(scrubIndex)
    }
  }, [scrubIndex])

  const [scrubbing, setScrubbing] = useState(false)

  const [breakpoints, setBreakpoints] = useState([])
  useEffect(() => {
    if (window.width) {
      const unitWidth = window.width / navigation.state.routes.length
      setBreakpoints(navigation.state.routes.reduce((acc, route, i) => {
        acc.push(unitWidth * i)
        return acc
      }, []))
    }
  }, [window])

  const [currentX, setCurrentX] = useState(0)
  useEffect(() => {
    const newIndex = breakpoints.reduce((acc, breakpoint) => {
      if (currentX > breakpoint) {
        return acc + 1
      }
      return acc
    }, -1)
    setScrubIndex(newIndex)
  }, [currentX])

  const [panResponder] = useState(PanResponder.create({
    onMoveShouldSetPanResponder: () => {
      return true
    },
    onPanResponderMove: (event, gestureState) => {
      setScrubbing(true)
      setCurrentX(gestureState.moveX)
    },
    onPanResponderRelease: () => {
      setScrubbing(false)
    },
  }))

  const onPressAdd = () => {
    Actions.addTaskScreen()
  }

  const onPressTab = (i) => {
    navigateToTab(i)
  }

  return (
    <Animated.View
      style={classes.mainContainer}
      {...panResponder.panHandlers}
    >
      {scrubbing ? (
        <View style={classes.scrubsContainer}>
          {navigation.state.routes.map((route, i) => {
            const backgroundColor = theme.globals.tabs[i].color
            const opacity = scrubIndex === i ? 1 : theme.globals.blurOpacity

            return (
              <View
                key={route.key}
                style={[
                  classes.scrub,
                  { backgroundColor, opacity },
                ]}
              />
            )
          })}
        </View>
      ) : (
        <View style={classes.tabsContainer}>
          {navigation.state.routes.map((route, i) => {
            const backgroundColor = theme.globals.tabs[i].color
            const opacity = navigation.state.index === i ? 1 : theme.globals.blurOpacity

            return (
              <TouchableWithoutFeedback
                key={route.key}
                onPress={() => {
                  onPressTab(i)
                }}
              >
                <View style={classes.tabContainer}>
                  {i === 1 ? (
                    <Button
                      icon={(
                        <PlusIcon
                          size={theme.globals.tabBarHeight / 2}
                        />
                      )}
                      buttonStyle={[
                        classes.addButton,
                        { backgroundColor, opacity },
                      ]}
                      onPress={onPressAdd}
                      disabled={navigation.state.index !== i}
                      disabledStyle={{ backgroundColor }}
                    />
                  ) : (
                    <View
                      style={[
                        classes.icon,
                        { backgroundColor, opacity },
                      ]}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
            )
          })}
        </View>
      )}
    </Animated.View>
  )
}

TabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default observer(TabBar)
