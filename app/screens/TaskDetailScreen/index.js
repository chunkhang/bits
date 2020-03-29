import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'

import { useStores, useTheme, useStyles } from '~/hooks'
import { ListItem } from '~/components'

import styles from './styles'

const TaskDetailScreen = () => {
  const { taskStore } = useStores()
  const theme = useTheme()
  const classes = useStyles(styles)

  const onChangeText = (input) => {
    if (!input.trim()) return
    taskStore.task.name = input
  }

  return (
    <View style={classes.mainContainer}>
      <ListItem
        editable
        value={taskStore.task.name}
        onChangeText={onChangeText}
        color={theme.colors.yellow}
      />
    </View>
  )
}

export default observer(TaskDetailScreen)
