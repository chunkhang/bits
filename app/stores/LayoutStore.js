import { observable, action } from 'mobx'

class LayoutStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable addTaskInput = ''

  @action
  setAddTaskInput = (input) => {
    this.addTaskInput = input
  }
}

export default LayoutStore
