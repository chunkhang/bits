import { useContext } from 'react'
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

export {
  useStores,
  useTheme,
}
