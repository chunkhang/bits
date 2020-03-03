import React, { useState, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, View, Keyboard } from 'react-native'
import { Input } from 'react-native-elements'

import { useStores, useStyles } from '~/hooks'
import { Lightbox } from '~/components'

import styles from './styles'

const TaskAddScreen = () => {
  const { taskStore } = useStores()
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
    taskStore.addTask({
      name: value.trim(),
    })
    setValue('')
  }

  return (
    <Lightbox
      canTapToDismiss
      onDismiss={() => {
        Keyboard.dismiss()
      }}
    >
      {(dismiss) => (
        <KeyboardAvoidingView
          style={classes.mainContainer}
          keyboardVerticalOffset={44}
          behavior="padding"
        >
          <View style={classes.container}>
            <Input
              value={value}
              onChangeText={handleInput}
              ref={inputRef}
              containerStyle={classes.containerStyle}
              inputContainerStyle={classes.inputContainerStyle}
              inputStyle={classes.inputStyle}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                if (!value.trim()) {
                  dismiss()
                  return
                }
                handleSubmit()
              }}
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </Lightbox>
  )
}

export default TaskAddScreen
