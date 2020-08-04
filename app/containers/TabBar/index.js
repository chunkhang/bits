import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { useTheme, useStyles } from '~/hooks'
import { PlusIcon } from '~/components'

import styles from './styles'

const TabBar = ({ navigation }) => {
  const { routes, index } = navigation.state

  const theme = useTheme()
  const classes = useStyles(styles)

  const [iconMargin] = useState(12)
  const [hitSlop] = useState(30)

  const onPressAdd = () => {
    Actions.todayTasks()
    setTimeout(() => {
      Actions.addTask()
    })
  }

  const navigateToTab = (i) => {
    const route = routes[i]
    const navigate = Actions[route.key]
    navigate()
  }

  const onPressLeft = () => {
    if (index === 0) return
    navigateToTab(index - 1)
  }

  const onPressRight = () => {
    if (index === routes.length - 1) return
    navigateToTab(index + 1)
  }

  return (
    <View
      style={classes.mainContainer}
    >
      <TouchableOpacity
        onPress={onPressLeft}
      >
        <Icon
          name="chevron-left"
          type="feather"
        />
      </TouchableOpacity>
      <View style={classes.iconsContainer}>
        {routes.map((route, i) => {
          const backgroundColor = theme.globals.tabs[i].color
          const marginRight = i !== routes.length - 1 ? iconMargin : 0

          return index === i ? (
            <Button
              key={route.key}
              icon={<PlusIcon size={16} />}
              buttonStyle={[
                classes.addButton,
                { backgroundColor, marginRight },
              ]}
              hitSlop={{
                left: hitSlop,
                right: hitSlop,
              }}
              onPress={onPressAdd}
            />
          ) : (
            <View
              key={route.key}
              style={[
                classes.icon,
                { backgroundColor, marginRight },
              ]}
            />
          )
        })}
      </View>
      <TouchableOpacity
        onPress={onPressRight}
      >
        <Icon
          name="chevron-right"
          type="feather"
        />
      </TouchableOpacity>
    </View>
  )
}

TabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default observer(TabBar)
