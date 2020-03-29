import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { useStores, useTheme, useStyles } from '~/hooks'
import { Header } from '~/components'

import styles from './styles'

const TabBar = ({ navigation }) => {
  const { routes, index } = navigation.state

  const { taskStore } = useStores()
  const theme = useTheme()
  const classes = useStyles(styles)

  const tabNames = [
    'Upcoming',
    'Today',
    'Done',
  ]
  const tabColors = [
    theme.colors.red,
    theme.colors.yellow,
    theme.colors.green,
  ]

  const name = tabNames[index]
  const color = tabColors[index]

  const hitSlop = 24

  return (
    <Header color={color}>
      <View style={classes.item}>
        <Text style={theme.classes.title}>
          {name}
        </Text>
      </View>
      <View style={[classes.item, classes.middleItem]}>
        <View style={classes.tabIconsContainer}>
          {routes.map((route, i) => {
            const marginRight = i === routes.length - 1 ? 0 : 12
            const size = index === i ? 24 : 18
            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  classes.tabIcon,
                  {
                    backgroundColor: tabColors[i],
                    marginRight,
                    width: size,
                    height: size,
                  },
                ]}
                hitSlop={{
                  top: hitSlop,
                  bottom: hitSlop,
                  left: hitSlop,
                  right: hitSlop,
                }}
                onPress={() => {
                  const navigate = Actions[route.key]
                  navigate()
                }}
              />
            )
          })}
        </View>
      </View>
      <View style={[classes.item, classes.rightItem]}>
        <Text style={theme.classes.subtitle}>
          {`${taskStore.count} total`}
        </Text>
      </View>
    </Header>
  )
}

TabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default observer(TabBar)
