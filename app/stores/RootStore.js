import { create } from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage'

import LayoutStore from './LayoutStore'
import UpcomingStore from './UpcomingStore'
import TodayStore from './TodayStore'
import DoneStore from './DoneStore'

class RootStore {
  constructor() {
    this.layoutStore = new LayoutStore(this)
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
      hydrate('upcomingStore', this.upcomingStore),
      hydrate('todayStore', this.todayStore),
      hydrate('doneStore', this.doneStore),
    ])
  }
}

export default RootStore
