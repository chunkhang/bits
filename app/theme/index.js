const colors = {
  black: '#000000',
  white: '#ffffff',
  blue: '#7ea8be',
  red: '#e15554',
  yellow: '#e1bc29',
  green: '#8cae68',
  whiteTranslucent: 'rgba(255, 255, 255, 0.75)',
}

const weights = {
  light: '300',
  regular: '400',
  medium: '500',
}

const classes = {
  title: {
    fontWeight: weights.medium,
    textTransform: 'uppercase',
    fontSize: 12,
  },

  subtitle: {
    fontWeight: weights.light,
    fontSize: 12,
  },
}

const theme = {
  colors,
  weights,
  classes,
}

export default theme
