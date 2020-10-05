import { observable, action } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import database from '~/database'

class TaskStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable tasks = []

  @action getTasks = () => {
    const tasks = database.realm.objects('Task').sorted('created_at')
    this.tasks = tasks.map((task) => ({
      id: task.id,
      name: task.name,
      created_at: task.created_at,
    }))
  }

  @action createTask = (task) => {
    database.realm.write(() => {
      const newTask = database.realm.create('Task', {
        id: uuidv4(),
        name: task.name,
      })
      this.tasks.push({
        id: newTask.id,
        name: newTask.name,
        created_at: newTask.created_at,
      })
    })
  }
}

export default TaskStore
