import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'
import { v4 as uuidv4 } from 'uuid'

class TaskStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @persist('list')
  @observable tasks = []

  @action addTask = (task) => {
    this.tasks.push({
      id: uuidv4(),
      ...task,
    })
  }

  @action updateTask = (id, updates) => {
    this.tasks = this.tasks.map((task) => {
      if (task.id !== id) return task
      return {
        ...task,
        ...updates,
      }
    })
  }

  @action removeTask = (id) => {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id
    })
  }

  @action reorderTasks = (order) => {
    if (order.length !== this.tasks.length) return
    const newTasks = order.map((key) => {
      return this.tasks[key]
    })
    this.tasks = newTasks
  }
}

export default TaskStore
