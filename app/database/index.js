import Realm from 'realm'

import v1 from './v1'

const schemas = [
  v1,
]

const latestSchema = schemas[schemas.length - 1]

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

const clear = () => {
  Realm.deleteFile(latestSchema)
}

export default {
  migrate,
  clear,
}
