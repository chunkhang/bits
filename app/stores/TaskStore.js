import { observable, action } from 'mobx'

class TaskStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable count = 0

  @action
  increment = () => {
    this.count += 1
  }
}

export default TaskStore
