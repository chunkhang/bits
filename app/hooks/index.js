import { useContext, useRef, useEffect } from 'react'
import { DynamicValue, DynamicStyleSheet, useDynamicValue } from 'react-native-dynamic'
import { ThemeContext } from 'react-native-elements'

import { StoreContext, DatabaseContext } from '~/contexts'

const useStores = () => {
  const stores = useContext(StoreContext)
  return stores
}

const useDatabase = () => {
  const database = useContext(DatabaseContext)
  return database
}

const useTheme = () => {
  const { theme } = useContext(ThemeContext)
  // Fix dynamic value prototype
  Object.keys(theme.dynamics).forEach((key) => {
    Object.setPrototypeOf(theme.dynamics[key], DynamicValue.prototype)
  })
  return theme
}

const useStyles = (makeStyles) => {
  const theme = useTheme()
  const styles = makeStyles(theme, (...args) => new DynamicValue(...args))
  const styleSheet = new DynamicStyleSheet(styles)
  const classes = useDynamicValue(styleSheet)
  return classes
}

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

const useTrackingRef = (value) => {
  const valueRef = useRef(value)
  useEffect(() => {
    valueRef.current = value
  }, [value])
  return valueRef
}

export {
  useStores,
  useDatabase,
  useTheme,
  useStyles,
  usePrevious,
  useTrackingRef,
}
