import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { KeyboardAvoidingView, Keyboard, View } from 'react-native'
import { Input } from 'react-native-elements'
import { observer } from 'mobx-react'

import { useStores, useStyles, useTheme } from '~/hooks'
import { DingSound } from '~/assets/sounds'
import { Lightbox, Header } from '~/components'

import styles from './styles'

const TaskAddScreen = ({ title }) => {
  const { layoutStore, todayStore } = useStores()
  const classes = useStyles(styles)
  const theme = useTheme()

  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const onChangeText = (input) => {
    layoutStore.setAddTaskInput(input)
  }

  const onSubmitEditing = () => {
    const name = layoutStore.addTaskInput.trim()
    if (!name) return

    todayStore.addTask({ name })

    layoutStore.setAddTaskInput('')

    DingSound.stop()
    DingSound.play()
  }

  const handleDismiss = () => {
    Keyboard.dismiss()
  }

  return (
    <Lightbox
      tapToDismiss
      onDismiss={handleDismiss}
    >
      <KeyboardAvoidingView
        style={classes.mainContainer}
        keyboardVerticalOffset={44}
        behavior="padding"
      >
        <Header title={title} />
        <View style={classes.itemContainer}>
          <View
            style={[
              classes.dot,
              { backgroundColor: theme.colors.yellow },
            ]}
          />
          <Input
            value={layoutStore.addTaskInput}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            clearButtonMode="while-editing"
            returnKeyType="next"
            enablesReturnKeyAutomatically
            blurOnSubmit={false}
            containerStyle={classes.containerStyle}
            inputContainerStyle={classes.inputContainerStyle}
            inputStyle={classes.inputStyle}
            ref={inputRef}
          />
        </View>
      </KeyboardAvoidingView>
    </Lightbox>
  )
}

TaskAddScreen.propTypes = {
  title: PropTypes.string.isRequired,
}

export default observer(TaskAddScreen)
