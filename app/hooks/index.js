import { useContext } from 'react'

import { StoreContext } from '~/contexts'

const useStores = () => {
  const stores = useContext(StoreContext)
  return stores
}

export {
  useStores,
}
