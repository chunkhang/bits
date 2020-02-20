import { create } from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage'

import TaskStore from './TaskStore'

class RootStore {
  constructor() {
    this.taskStore = new TaskStore(this)
  }

  rehydrate = () => {
    const hydrate = create({
      storage: AsyncStorage,
      jsonify: true,
    })
    return Promise.all([
      hydrate('taskStore', this.taskStore),
    ])
  }
}

export default RootStore
