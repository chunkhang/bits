import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  NativeModules,
  Alert,
} from 'react-native'
import { Text } from 'react-native-elements'
import { observer } from 'mobx-react'
import I18n from 'i18n-js'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useStyles, useTheme, useStores } from '~/hooks'
import { BeepSound } from '~/assets/sounds'
import config from '~/config'
import database from '~/database'

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

  const settings = [
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

  const onLongPressVersion = async (event) => {
    if (!__DEV__ || event.nativeEvent.state !== State.ACTIVE) return
    Alert.alert(
      I18n.t('alert.debug.title'),
      I18n.t('alert.debug.message'),
      [
        {
          text: I18n.t('alert.debug.action.reset'),
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear()
            database.clear()
            NativeModules.DevSettings.reload()
          },
        },
        {
          text: I18n.t('general.cancel'),
          style: 'cancel',
          onPress: () => null,
        },
      ],
    )
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={classes.safeContainer}
    >
      <ScrollView>
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
          <View style={classes.versionContainer}>
            <Text style={classes.version}>
              {config.version}
            </Text>
          </View>
        </LongPressGestureHandler>
      </View>
    </SafeAreaView>
  )
}

export default observer(SettingsScreen)
