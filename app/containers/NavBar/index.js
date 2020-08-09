import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import { useStyles } from '~/hooks'
import { Header } from '~/components'

import styles from './styles'

const NavBar = ({ title, hideBackButton }) => {
  const classes = useStyles(styles)

  const onPress = () => {
    Actions.pop()
  }

  return (
    <Header
      title={title}
      leftNode={hideBackButton ? null : (
        <TouchableOpacity
          style={classes.iconContainer}
          onPress={onPress}
        >
          <Icon
            name="arrow-left"
            type="feather"
          />
        </TouchableOpacity>
      )}
    />
  )
}

NavBar.propTypes = {
  title: PropTypes.string,
  hideBackButton: PropTypes.bool,
}

NavBar.defaultProps = {
  title: null,
  hideBackButton: false,
}

export default NavBar
