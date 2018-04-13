'use strict'
module.exports = {
  NODE_ENV: '"production"'{{#if_in options "qiniu"}},
  CDN_ENV: `"${process.env.CDN_ENV || ''}"`{{/if_in}}
}
