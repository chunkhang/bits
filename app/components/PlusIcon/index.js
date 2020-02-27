import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { useStyles } from '~/hooks'

import styles from './styles'

const PlusIcon = ({ size }) => {
  const classes = useStyles(styles)

  const strokeSize = 2

  return (
    <View
      style={[
        classes.mainContainer,
        { height: size, width: size },
      ]}
    >
      <View
        style={[
          classes.stroke,
          { width: '100%', height: strokeSize },
        ]}
      />
      <View
        style={[
          classes.stroke,
          { height: '100%', width: strokeSize },
        ]}
      />
    </View>
  )
}

PlusIcon.propTypes = {
  size: PropTypes.number,
}

PlusIcon.defaultProps = {
  size: 12,
}

export default PlusIcon
