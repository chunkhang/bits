import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class TaskStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @persist('list')
  @observable tasks = []

  @action
  addTask = (task) => {
    const { name } = task
    this.tasks.push({
      name,
    })
  }
}

export default TaskStore
