import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, Animated } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { useStyles } from '~/hooks'

import styles from './styles'

const Lightbox = ({
  children,
  canTapToDismiss,
  onDismiss,
  duration,
}) => {
  const classes = useStyles(styles)

  const [opacity] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start()
  }, [])

  const dismiss = () => {
    onDismiss()
    Animated.timing(opacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(Actions.pop)
  }

  const handlePress = () => {
    if (canTapToDismiss) {
      dismiss()
    }
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
          {children(dismiss)}
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

Lightbox.propTypes = {
  children: PropTypes.func.isRequired,
  canTapToDismiss: PropTypes.bool,
  onDismiss: PropTypes.func,
  duration: PropTypes.number,
}

Lightbox.defaultProps = {
  canTapToDismiss: false,
  onDismiss: () => null,
  duration: 250,
}

export default Lightbox
