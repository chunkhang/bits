import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text, Divider } from 'react-native-elements'

import { useStyles } from '~/hooks'

import styles from './styles'

const Header = ({
  color,
  title,
  subtitle,
  content,
}) => {
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
      <View style={classes.header}>
        <View style={classes.item}>
          <Text style={classes.title}>
            {title}
          </Text>
        </View>
        <View
          style={[
            classes.item,
            classes.middleItem,
          ]}
        >
          {content}
        </View>
        <View
          style={[
            classes.item,
            classes.rightItem,
          ]}
        >
          <Text style={classes.subtitle}>
            {subtitle}
          </Text>
        </View>
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
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  content: PropTypes.node,
}

Header.defaultProps = {
  subtitle: null,
  content: null,
}

export default Header
