import { observable, action } from 'mobx'

class LayoutStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  /* Navigation bar */

  @observable deleteCallback = () => null

  @action onDelete = (callback) => {
    this.deleteCallback = callback
  }

  /* Inputs */

  @observable addTaskInput = ''

  @action setAddTaskInput = (input) => {
    this.addTaskInput = input
  }
}

export default LayoutStore
