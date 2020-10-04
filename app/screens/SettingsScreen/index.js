import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  NativeModules,
} from 'react-native'
import { Text } from 'react-native-elements'
import { observer } from 'mobx-react'
import I18n from 'i18n-js'
import { LongPressGestureHandler } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import { useStyles, useTheme, useStores } from '~/hooks'
import { BeepSound } from '~/assets/sounds'
import config from '~/config'

import styles from './styles'

const SettingsRow = ({ setting }) => {
  const theme = useTheme()
  const classes = useStyles(styles)

  const [backgroundColor, setBackgroundColor] = useState(null)
  const [borderWidth, setBorderWidth] = useState(null)
  useEffect(() => {
    if (setting.active) {
      setBackgroundColor(theme.colors.green)
      setBorderWidth(0)
    } else {
      setBackgroundColor(null)
      setBorderWidth(StyleSheet.hairlineWidth)
    }
  }, [setting.active])

  const onPress = () => {
    setting.toggleActive()
    BeepSound.play()
  }

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View style={classes.row}>
        <Text style={classes.rowText}>
          {setting.text}
        </Text>
        <View
          style={[
            classes.rowDot,
            { backgroundColor, borderWidth },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

SettingsRow.propTypes = {
  setting: PropTypes.object.isRequired,
}

const SettingsScreen = () => {
  const classes = useStyles(styles)
  const { settingsStore } = useStores()

  // TODO: Implement
  const settings = [
    {
      text: I18n.t('screen.settings.darkMode'),
      active: settingsStore.darkMode,
      toggleActive: settingsStore.toggleDarkMode,
    },
    {
      text: I18n.t('screen.settings.sounds'),
      active: settingsStore.sounds,
      toggleActive: settingsStore.toggleSounds,
    },
    {
      text: I18n.t('screen.settings.badges'),
      active: settingsStore.badges,
      toggleActive: settingsStore.toggleBadges,
    },
  ]

  const [longPressDuration] = useState(1000)

  const onLongPressVersion = async () => {
    if (!__DEV__) return
    await AsyncStorage.clear()
    NativeModules.DevSettings.reload()
  }

  return (
    <View style={classes.mainContainer}>
      <ScrollView style={classes.scrollContainer}>
        {settings.map((setting) => (
          <SettingsRow
            key={setting.text}
            setting={setting}
          />
        ))}
      </ScrollView>
      <View style={classes.bottomContainer}>
        <LongPressGestureHandler
          onHandlerStateChange={onLongPressVersion}
          minDurationMs={longPressDuration}
        >
          <Text style={classes.version}>
            {config.version}
          </Text>
        </LongPressGestureHandler>
      </View>
    </View>
  )
}

export default observer(SettingsScreen)
