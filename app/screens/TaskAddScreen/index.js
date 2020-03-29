import React, { useState, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, View, Keyboard } from 'react-native'
import { Text, Input } from 'react-native-elements'

import { useStores, useTheme, useStyles } from '~/hooks'
import { Lightbox, Header } from '~/components'

import styles from './styles'

const TaskAddScreen = () => {
  const { taskStore } = useStores()
  const theme = useTheme()
  const classes = useStyles(styles)

  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const [value, setValue] = useState('')

  const handleInput = (input) => {
    setValue(input)
  }

  const handleSubmit = () => {
    const name = value.trim()
    if (!name) return

    taskStore.addTask({ name })

    setValue('')
  }

  const handleDismiss = () => {
    Keyboard.dismiss()
  }

  return (
    <Lightbox
      canTapToDismiss
      onDismiss={handleDismiss}
    >
      <KeyboardAvoidingView
        style={classes.mainContainer}
        keyboardVerticalOffset={44}
        behavior="padding"
      >
        <Header color={theme.colors.yellow}>
          <Text style={theme.classes.title}>
            Add Task
          </Text>
        </Header>
        <View style={classes.body}>
          <View style={classes.task}>
            <View style={classes.dot} />
            <Input
              value={value}
              onChangeText={handleInput}
              ref={inputRef}
              containerStyle={classes.containerStyle}
              inputContainerStyle={classes.inputContainerStyle}
              inputStyle={classes.inputStyle}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={handleSubmit}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Lightbox>
  )
}

export default TaskAddScreen
