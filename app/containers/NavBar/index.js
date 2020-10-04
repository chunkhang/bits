import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PropTypes from 'prop-types'

import Header from '~/components/Header'

const NavBar = ({ title, navBarNodes }) => {
  const { leftNode, rightNode } = navBarNodes

  return (
    <SafeAreaView edges={['top']}>
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
