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
{{#if_in options "i18n"}}
// sentry
const i18n = {
  // 取值与 lang_[name] 中的 name 保持一致
  locale: 'zh',
  loaded: ['zh']
}

{{/if_in}}
module.exports = {
  title,{{#if_in options "growingio"}}
  growingio,{{/if_in}}{{#if_in options "sentry"}}
  sentry,{{/if_in}}{{#if_in options "i18n"}}
  i18n{{/if_in}}
};
