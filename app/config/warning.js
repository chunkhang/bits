import { LogBox } from 'react-native'

if (__DEV__) {
  LogBox.ignoreLogs([
    // https://github.com/gitim/react-native-sortable-list/issues/167
    'componentWillReceiveProps',
    'componentWillMount',

    // https://github.com/gitim/react-native-sortable-list/issues/193
    'SortableList',

    // https://github.com/react-navigation/react-navigation/issues/8457
    'currentlyFocusedField is deprecated',

    'A DynamicStyleSheet was used without any DynamicValues',
  ])
}
