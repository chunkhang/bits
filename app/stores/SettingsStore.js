import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class SettingStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @persist
  @observable darkMode = false

  @action toggleDarkMode = () => {
    this.darkMode = !this.darkMode
  }
}

export default SettingStore
