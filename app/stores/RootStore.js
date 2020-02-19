import TaskStore from './TaskStore'

class RootStore {
  constructor() {
    this.taskStore = new TaskStore(this)
  }
}

export default RootStore
