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
  enterDuration,
  exitDuration,
}) => {
  const classes = useStyles(styles)

  const [opacity] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: enterDuration,
      useNativeDriver: true,
    }).start()
  }, [])

  const dismiss = () => {
    onDismiss()
    Animated.timing(opacity, {
      toValue: 0,
      duration: exitDuration,
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
          {typeof children === 'function' ?
            children(dismiss) : children}
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

Lightbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  canTapToDismiss: PropTypes.bool,
  onDismiss: PropTypes.func,
  enterDuration: PropTypes.number,
  exitDuration: PropTypes.number,
}

Lightbox.defaultProps = {
  canTapToDismiss: false,
  onDismiss: () => null,
  enterDuration: 100,
  exitDuration: 100,
}

export default Lightbox
