import { configure } from 'mobx'
import { create } from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage'

import LayoutStore from './LayoutStore'
import SettingsStore from './SettingsStore'
import UpcomingStore from './UpcomingStore'
import TodayStore from './TodayStore'
import DoneStore from './DoneStore'

class RootStore {
  constructor() {
    if (__DEV__) {
      configure({ enforceActions: 'always' })
    }
    this.layoutStore = new LayoutStore(this)
    this.settingsStore = new SettingsStore(this)
    this.upcomingStore = new UpcomingStore(this)
    this.todayStore = new TodayStore(this)
    this.doneStore = new DoneStore(this)
  }

  rehydrate = () => {
    const hydrate = create({
      storage: AsyncStorage,
      jsonify: true,
    })
    return Promise.all([
      hydrate('settingsStore', this.settingsStore),
      hydrate('upcomingStore', this.upcomingStore),
      hydrate('todayStore', this.todayStore),
      hydrate('doneStore', this.doneStore),
    ])
  }
}

export default RootStore
