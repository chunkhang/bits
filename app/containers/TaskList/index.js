import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { useStores, useTheme } from '~/hooks'
import { ListItem } from '~/components'

const TaskList = () => {
  const { taskStore } = useStores()
  const theme = useTheme()

  const onPress = (task) => {
    taskStore.selectTask(task.id)
    Actions.taskDetail()
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {taskStore.tasks.map((task) => {
        return (
          <ListItem
            key={task.id}
            value={task.name}
            onPress={() => {
              onPress(task)
            }}
            color={theme.colors.yellow}
            containerStyle={{ marginBottom: 12 }}
          />
        )
      })}
    </ScrollView>
  )
}

export default observer(TaskList)
