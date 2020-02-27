import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, Animated } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { useStyles } from '~/hooks'

import styles from './styles'

const Lightbox = ({ children, dismissable, duration }) => {
  const classes = useStyles(styles)

  const [opacity] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start()
  }, [])

  const handlePress = () => {
    if (!dismissable) return

    Animated.timing(opacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(Actions.pop)
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        style={[
          classes.mainContainer,
          { opacity },
        ]}
      >
        <TouchableWithoutFeedback>
          {children}
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

Lightbox.propTypes = {
  children: PropTypes.node.isRequired,
  dismissable: PropTypes.bool,
  duration: PropTypes.number,
}

Lightbox.defaultProps = {
  dismissable: false,
  duration: 250,
}

export default Lightbox
