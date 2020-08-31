import { YellowBox } from 'react-native'

if (__DEV__) {
  YellowBox.ignoreWarnings([
    'componentWillReceiveProps',
    'componentWillMount',
    'SortableList',
  ])
}
