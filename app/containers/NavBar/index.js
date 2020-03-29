import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import { useTheme, useStyles } from '~/hooks'
import { Header } from '~/components'

import styles from './styles'

const NavBar = ({ title }) => {
  const theme = useTheme()
  const classes = useStyles(styles)

  const onPress = () => {
    Actions.pop()
  }

  return (
    <Header color={theme.colors.yellow}>
      <View style={classes.iconContainer}>
        <Icon
          name="arrow-left"
          type="feather"
          onPress={onPress}
        />
      </View>
      <View style={classes.titleContainer}>
        <Text style={theme.classes.title}>
          {title}
        </Text>
      </View>
    </Header>
  )
}

NavBar.propTypes = {
  title: PropTypes.string,
}

NavBar.defaultProps = {
  title: null,
}

export default NavBar
