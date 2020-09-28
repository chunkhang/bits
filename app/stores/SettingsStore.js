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

  @persist
  @observable sounds = true

  @action toggleSounds = () => {
    this.sounds = !this.sounds
  }

  @persist
  @observable badges = true

  @action toggleBadges = () => {
    this.badges = !this.badges
  }
}

export default SettingStore
