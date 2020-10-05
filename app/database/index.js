import Realm from 'realm'

import v1 from './v1'

const schemaWrapper = (schema) => {
  return {
    ...schema,
    deleteRealmIfMigrationNeeded: __DEV__,
  }
}

const schemas = [
  schemaWrapper(v1),
]

const latestSchema = schemas[schemas.length - 1]

// Migrate realm to the latest schema
const migrate = () => {
  let nextIndex = Realm.schemaVersion(Realm.defaultPath)
  if (nextIndex !== -1) {
    while (nextIndex < schemas.length) {
      const migratedRealm = new Realm(schemas[nextIndex])
      migratedRealm.close()
      nextIndex += 1
    }
  }
  const realm = new Realm(latestSchema)
  return realm
}

// Clear realm completely from app
const clear = () => {
  Realm.deleteFile(latestSchema)
}

export default {
  migrate,
  clear,
}
