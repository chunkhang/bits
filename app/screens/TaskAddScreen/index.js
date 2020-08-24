import React, { useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Keyboard } from 'react-native'
import { observer } from 'mobx-react'

import { useStores, useStyles, useTheme } from '~/hooks'
import { DingSound } from '~/assets/sounds'
import { Lightbox, Header, ListItem } from '~/components'

import styles from './styles'

const TaskAddScreen = () => {
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
        <Header title="Add Task" />
        <ListItem
          editable
          value={layoutStore.addTaskInput}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="next"
          blurOnSubmit={false}
          ref={inputRef}
          color={theme.colors.yellow}
        />
      </KeyboardAvoidingView>
    </Lightbox>
  )
}

export default observer(TaskAddScreen)
