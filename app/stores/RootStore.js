import { create } from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage'

import TaskStore from './TaskStore'

class RootStore {
  constructor() {
    this.taskStore = new TaskStore(this)
  }
}

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
})

const rehydrate = (rootStore) => {
  return Promise.all([
    hydrate('taskStore', rootStore.taskStore),
  ])
}

export default RootStore

export {
  rehydrate,
}
