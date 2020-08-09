import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text, Divider } from 'react-native-elements'
import { observer } from 'mobx-react'

import { useStyles, useStores } from '~/hooks'

import styles from './styles'

const Header = ({ color, title, leftNode, rightNode }) => {
  const classes = useStyles(styles)
  const { layoutStore } = useStores()

  const [backgroundColor, setBackgroundColor] = useState(color)
  useEffect(() => {
    if (color) {
      setBackgroundColor(color)
    } else {
      setBackgroundColor(layoutStore.tabColor)
    }
  }, [color, layoutStore.tabColor])

  return (
    <View style={classes.mainContainer}>
      <View style={classes.header}>
        {leftNode}
        <View style={classes.titleContainer}>
          <Text style={classes.title}>
            {title}
          </Text>
        </View>
        {rightNode}
      </View>
      <Divider style={[classes.divider, { backgroundColor }]} />
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  leftNode: PropTypes.node,
  rightNode: PropTypes.node,
  color: PropTypes.string,
}

Header.defaultProps = {
  title: null,
  leftNode: null,
  rightNode: null,
  color: null,
}

export default observer(Header)
