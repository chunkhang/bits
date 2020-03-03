import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text, Divider } from 'react-native-elements'
import { observer } from 'mobx-react'

import { useStores, useTheme, useStyles } from '~/hooks'

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

  return (
    <View style={classes.mainContainer}>
      <View style={classes.header}>
        <View style={classes.headerItem}>
          <Text style={classes.tabName}>{name}</Text>
        </View>
        <View
          style={[
            classes.headerItem,
            classes.headerItemTabs,
          ]}
        >
          {routes.map((route, i) => {
            const marginRight = i === routes.length - 1 ? 0 : 12
            const size = index === i ? 24 : 18
            return (
              <View
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
              />
            )
          })}
        </View>
        <View
          style={[
            classes.headerItem,
            classes.headerItemCount,
          ]}
        >
          <Text style={classes.tabCount}>
            {`${taskStore.count} total`}
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

TabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default observer(TabBar)
