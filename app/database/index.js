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

class Database {
  constructor() {
    this.migrate()
    this.schema = schemas[schemas.length - 1]
    this.realm = new Realm(this.schema)
  }

  // Migrate realm to the latest schema
  migrate = () => {
    let nextIndex = Realm.schemaVersion(Realm.defaultPath)
    if (nextIndex !== -1) {
      while (nextIndex < schemas.length) {
        const migratedRealm = new Realm(schemas[nextIndex])
        migratedRealm.close()
        nextIndex += 1
      }
    }
  }

  // Clear realm completely from app
  clear = () => {
    Realm.deleteFile(this.schema)
  }
}

export default new Database()
