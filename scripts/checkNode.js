#!/usr/bin/env node

const packageJson = require('../package.json')

const expectedVersion = packageJson.engines.node
const currentVersion = process.versions.node

if (currentVersion !== expectedVersion) {
  console.log(`Expected node version to be ${expectedVersion}.`)
  console.log('Try running `nvm use`.')
  process.exit(1)
}
