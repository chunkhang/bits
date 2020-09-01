import { observable, action } from 'mobx'

class LayoutStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  /* Navigation bar */

  @observable settingsCallback = () => null

  @action onSettings = (callback) => {
    this.settingsCallback = callback
  }

  @observable deleteCallback = () => null

  @action onDelete = (callback) => {
    this.deleteCallback = callback
  }

  @observable clearCallback = () => null

  @action onClear = (callback) => {
    this.clearCallback = callback
  }

  /* Inputs */

  @observable addTaskInput = ''

  @action setAddTaskInput = (input) => {
    this.addTaskInput = input
  }
}

export default LayoutStore
