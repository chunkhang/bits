import React from 'react'
import { View } from 'react-native'

import { useStores, useTheme, useStyles } from '~/hooks'
import { ListItem } from '~/components'

import styles from './styles'

const TaskDetailScreen = () => {
  const { taskStore } = useStores()
  const theme = useTheme()
  const classes = useStyles(styles)

  return (
    <View style={classes.mainContainer}>
      <ListItem
        value={taskStore.task.name}
        color={theme.colors.green}
      />
    </View>
  )
}

export default TaskDetailScreen
