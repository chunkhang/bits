import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeContext } from 'react-native-elements'

import { StoreContext } from '~/contexts'

const useStores = () => {
  const stores = useContext(StoreContext)
  return stores
}

const useTheme = () => {
  const { theme } = useContext(ThemeContext)
  return theme
}

const useStyles = (makeStyles) => {
  const theme = useTheme()
  const styles = makeStyles(theme)
  const classes = StyleSheet.create(styles)
  return classes
}

export {
  useStores,
  useTheme,
  useStyles,
}
