import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class TaskStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @persist
  @observable count = 0

  @action
  increment = () => {
    this.count += 1
  }
}

export default TaskStore
