import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, Animated } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { useStyles } from '~/hooks'

import styles from './styles'

const Lightbox = ({
  children,
  tapToDismiss,
  onDismiss,
}) => {
  const classes = useStyles(styles)

  const [opacity] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }, [])

  const dismiss = () => {
    onDismiss()
    Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(Actions.pop)
  }

  const onPress = () => {
    if (tapToDismiss) {
      dismiss()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
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
  tapToDismiss: PropTypes.bool,
  onDismiss: PropTypes.func,
}

Lightbox.defaultProps = {
  tapToDismiss: false,
  onDismiss: () => null,
}

export default Lightbox
