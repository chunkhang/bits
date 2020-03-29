import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { useStores } from '~/hooks'

import TaskItem from '../TaskItem'

const TaskList = () => {
  const { taskStore } = useStores()

  const onPress = () => {
    Actions.taskDetail()
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {taskStore.tasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            task={task}
            containerStyle={{ marginBottom: 12 }}
            onPress={onPress}
          />
        )
      })}
    </ScrollView>
  )
}

export default observer(TaskList)
