// production
const prodDeal = (config) => {
  return process.env.NODE_ENV === 'production' ? config : {}
}

// page title
const title = 'Hife Template'

{{#if_in options "growingio"}}
// growingio
const growingio = prodDeal({
  account_id: ''
})

{{/if_in}}
{{#if_in options "sentry"}}
// sentry
const sentry = prodDeal({
  dsn: ''
})

{{/if_in}}
module.exports = {
  title,
  growingio,
  sentry
}
