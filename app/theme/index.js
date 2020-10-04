import { DynamicValue } from 'react-native-dynamic'

const globals = {
  horizontalGutter: 24,
  topGutter: 24,
  bottomGutter: 24,
  tabBarHeight: 48,
  blurOpacity: 0.2,
  taskItemHeight: 56,
}

const colors = {
  black: '#000000',
  white: '#ffffff',
  blue: '#7ea8be',
  red: '#e15554',
  yellow: '#e1bc29',
  green: '#8cae68',
  blackTranslucent: 'rgba(0, 0, 0, 0.75)',
  whiteTranslucent: 'rgba(255, 255, 255, 0.75)',
}

const dynamics = {
  background: new DynamicValue(colors.white, colors.black),
  foreground: new DynamicValue(colors.black, colors.white),
}

const weights = {
  light: '300',
  regular: '400',
  medium: '500',
}

export default {
  globals,
  colors,
  dynamics,
  weights,
}
