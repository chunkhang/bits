import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'
import { Appearance } from 'react-native'

class SettingStore {
  constructor(rootStore) {
    this.rootStore = rootStore
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
