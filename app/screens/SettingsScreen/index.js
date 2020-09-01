import React from 'react'
import { View, Switch } from 'react-native'
import { Text } from 'react-native-elements'
import { observer } from 'mobx-react'

import { useStyles, useTheme, useStores } from '~/hooks'

import styles from './styles'

const SettingsScreen = () => {
  const classes = useStyles(styles)
  const theme = useTheme()
  const { settingsStore } = useStores()

  // TODO: Dark mode, sounds, icon badge

  return (
    <View style={classes.mainContainer}>
      <View style={classes.row}>
        <Text style={classes.rowText}>
          Dark mode
        </Text>
        <Switch
          thumbColor={theme.colors.white}
          trackColor={{
            true: theme.colors.green,
            false: theme.colors.white,
          }}
          ios_backgroundColor={theme.colors.white}
          onValueChange={() => {
            settingsStore.toggleDarkMode()
          }}
          value={settingsStore.darkMode}
        />
      </View>
    </View>
  )
}

export default observer(SettingsScreen)
