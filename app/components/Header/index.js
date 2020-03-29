import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Divider } from 'react-native-elements'

import { useStyles } from '~/hooks'

import styles from './styles'

const Header = ({ color, children }) => {
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
      <View style={classes.header}>
        {children}
      </View>
      <Divider
        style={[
          classes.divider,
          { backgroundColor: color },
        ]}
      />
    </View>
  )
}

Header.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Header
