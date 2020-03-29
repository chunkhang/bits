import React, { useState, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, View, Keyboard } from 'react-native'
import { Text } from 'react-native-elements'

import { useStores, useTheme, useStyles } from '~/hooks'
import { Lightbox, Header, ListItem } from '~/components'

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

  const onChangeText = (input) => {
    setValue(input)
  }

  const onSubmitEditing = () => {
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
      tapToDismiss
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
          <ListItem
            editable
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            returnKeyType="next"
            blurOnSubmit={false}
            color={theme.colors.yellow}
            ref={inputRef}
          />
        </View>
      </KeyboardAvoidingView>
    </Lightbox>
  )
}

export default TaskAddScreen