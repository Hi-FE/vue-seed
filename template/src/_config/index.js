{{#if_in options "growingio"}}
// growingio
const growingio = {
  account_id: '',
  js_sdk: '//dn-growing.qbox.me/vds.js'
}

{{/if_in}}
{{#if_in options "sentry"}}
// sentry
const sentry = {
  dsn: ''
}

{{/if_in}}
{{#if_in options "i18n"}}
const i18n = {
  // 取值与 _i18n 下的 语言包名称保持一致
  locale: 'zh'
}

{{/if_in}}
export default {
{{#if_in options "growingio"}}
  growingio,{{/if_in}}{{#if_in options "sentry"}}
  sentry,{{/if_in}}{{#if_in options "i18n"}}
  i18n{{/if_in}}
};
