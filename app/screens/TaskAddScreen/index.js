import React, { useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Keyboard } from 'react-native'
import { observer } from 'mobx-react'

import { useStores, useStyles } from '~/hooks'
import { Lightbox, Header, ListItem } from '~/components'

import styles from './styles'

const TaskAddScreen = () => {
  const { layoutStore, taskStore } = useStores()
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

    taskStore.addTask({
      type: 'today',
      name,
    })

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
        <Header title="Add Task" />
        <ListItem
          editable
          value={layoutStore.addTaskInput}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="next"
          blurOnSubmit={false}
          ref={inputRef}
        />
      </KeyboardAvoidingView>
    </Lightbox>
  )
}

export default observer(TaskAddScreen)
