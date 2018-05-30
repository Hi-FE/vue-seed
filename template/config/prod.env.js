'use strict'
const argv = require('minimist')(process.argv.slice(2))
module.exports = {
  NODE_ENV: '"production"',
  IS_PROD_ENV: !!argv.prod
}
