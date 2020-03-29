import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'

import { useStores } from '~/hooks'

import TaskItem from '../TaskItem'

const TaskList = () => {
  const { taskStore } = useStores()

  return (
    <ScrollView style={{ flex: 1 }}>
      {taskStore.tasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            task={task}
            containerStyle={{ marginBottom: 12 }}
            onPress={() => {
              taskStore.removeTask(task.id)
            }}
          />
        )
      })}
    </ScrollView>
  )
}

export default observer(TaskList)
