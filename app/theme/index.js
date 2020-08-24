const colors = {
  black: '#000000',
  white: '#ffffff',
  blue: '#7ea8be',
  red: '#e15554',
  yellow: '#e1bc29',
  green: '#8cae68',
  whiteTranslucent: 'rgba(255, 255, 255, 0.75)',
}

const globals = {
  horizontalGutter: 24,
  topGutter: 24,
  bottomGutter: 24,
  tabBarHeight: 48,
  blurOpacity: 0.2,
  tabs: [
    { color: colors.red },
    { color: colors.yellow },
    { color: colors.green },
  ],
}

const weights = {
  light: '300',
  regular: '400',
  medium: '500',
}

export default {
  globals,
  colors,
  weights,
}
