import { observable } from 'mobx'

class TaskStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable list = [1, 2, 3]
}

export default TaskStore
