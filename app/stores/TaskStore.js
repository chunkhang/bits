import { observable, action, computed } from 'mobx'
import { persist } from 'mobx-persist'
import { v4 as uuidv4 } from 'uuid'

class TaskStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @persist('list')
  @observable tasks = []

  @observable index = null

  @computed get task() {
    if (this.index >= this.count) return null
    return this.tasks[this.index]
  }

  @computed get count() {
    return this.tasks.length
  }

  @action
  addTask = (task) => {
    this.tasks.push({
      id: uuidv4(),
      name: task.name,
    })
  }

  @action
  updateTask = (id, updates) => {
    this.tasks = this.tasks.map((task) => {
      if (task.id !== id) return task
      return {
        ...task,
        ...updates,
      }
    })
  }

  @action
  removeTask = (id) => {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id
    })
  }

  @action
  selectTask = (id) => {
    this.index = this.tasks.findIndex((task) => {
      return task.id === id
    })
  }
}

export default TaskStore
