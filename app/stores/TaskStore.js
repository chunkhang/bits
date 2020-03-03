import { observable, action, computed } from 'mobx'
import { persist } from 'mobx-persist'
import { v4 as uuidv4 } from 'uuid'

class TaskStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @persist('list')
  @observable tasks = []

  @computed get count() {
    return this.tasks.length
  }

  @action
  addTask = (task) => {
    const { name } = task

    this.tasks.push({
      id: uuidv4(),
      name,
    })
  }

  @action
  removeTask = (id) => {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id
    })
  }
}

export default TaskStore
