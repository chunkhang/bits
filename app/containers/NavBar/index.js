import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PropTypes from 'prop-types'

import { useStyles } from '~/hooks'
import Header from '~/components/Header'

import styles from './styles'

const NavBar = ({ title, navBarNodes }) => {
  const classes = useStyles(styles)

  const { leftNode, rightNode } = navBarNodes

  return (
    <SafeAreaView
      edges={['top']}
      style={classes.safeContainer}
    >
      <Header
        title={title}
        leftNode={leftNode}
        rightNode={rightNode}
      />
    </SafeAreaView>
  )
}

NavBar.propTypes = {
  title: PropTypes.string,
  navBarNodes: PropTypes.object,
}

NavBar.defaultProps = {
  title: null,
  navBarNodes: {},
}

export default NavBar
