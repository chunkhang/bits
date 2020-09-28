import { LogBox } from 'react-native'

if (__DEV__) {
  LogBox.ignoreLogs([
    'componentWillReceiveProps',
    'componentWillMount',
    'SortableList',
  ])
}
