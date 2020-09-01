import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text, Divider } from 'react-native-elements'
import { observer } from 'mobx-react'

import { useStyles } from '~/hooks'

import styles from './styles'

const Header = ({ title, leftNode, rightNode }) => {
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
      <View style={classes.header}>
        <View style={classes.leftContainer}>
          {leftNode}
        </View>
        <View style={classes.titleContainer}>
          <Text style={classes.title}>
            {title}
          </Text>
        </View>
        <View style={classes.rightContainer}>
          {rightNode}
        </View>
      </View>
      <Divider style={classes.divider} />
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  leftNode: PropTypes.node,
  rightNode: PropTypes.node,
}

Header.defaultProps = {
  title: null,
  leftNode: null,
  rightNode: null,
}

export default observer(Header)
