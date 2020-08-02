import React, { useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Keyboard } from 'react-native'
import { Text } from 'react-native-elements'
import { observer } from 'mobx-react'

import { useStores, useTheme, useStyles } from '~/hooks'
import { Lightbox, Header, ListItem } from '~/components'

import styles from './styles'

const TaskAddScreen = () => {
  const { layoutStore, taskStore } = useStores()
  const theme = useTheme()
  const classes = useStyles(styles)

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

    taskStore.addTask({ name })

    layoutStore.setAddTaskInput('')
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
        <ListItem
          editable
          value={layoutStore.addTaskInput}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="next"
          blurOnSubmit={false}
          color={theme.colors.yellow}
          ref={inputRef}
        />
      </KeyboardAvoidingView>
    </Lightbox>
  )
}

export default observer(TaskAddScreen)
