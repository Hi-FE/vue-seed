{{#if_or "growingio" "sentry"}}
// production
const prodDeal = (config) => {
  return process.env.NODE_ENV === 'production' ? config : {}
}

{{/if_or}}
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
  // 取值与 _i18n 下的 语言包名称保持一致
  locale: 'zh'
}

{{/if_in}}
module.exports = {
  title{{#if_in options "growingio"}},
  growingio{{/if_in}}{{#if_in options "sentry"}},
  sentry{{/if_in}}{{#if_in options "i18n"}},
  i18n{{/if_in}}
};
