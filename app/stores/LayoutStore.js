import { observable, computed, action } from 'mobx'

import theme from '~/theme'

class LayoutStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable tabIndex = 1

  @computed get tabColor() {
    return theme.globals.tabs[this.tabIndex].color
  }

  @action
  setTab = (tab) => {
    this.tabIndex = tab
  }

  @action
  setTabColor = (color) => {
    this.tabColor = color
  }

  @observable addTaskInput = ''

  @action
  setAddTaskInput = (input) => {
    this.addTaskInput = input
  }
}

export default LayoutStore
