import React from 'react'
import PropTypes from 'prop-types'

import { Header } from '~/components'

const NavBar = ({ title, navBarNodes }) => {
  const { leftNode, rightNode } = navBarNodes

  return (
    <Header
      title={title}
      leftNode={leftNode}
      rightNode={rightNode}
    />
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
