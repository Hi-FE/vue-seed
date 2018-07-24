// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-new */
import Vue from 'vue'
import router from 'src/_router'
import axios from 'axios'
import store from 'src/_store'{{#if_in_or options "i18n" "sentry"}}
import Config from 'src/_config'{{/if_in_or}}{{#if_in options "i18n"}}
import I18n from 'src/_i18n'{{/if_in}}{{#if_in options "sentry"}}
import Sentry from 'src/_utils/sentry'{{/if_in}}
import App from './App'

Vue.config.productionTip = false;

// 注册 $http
Vue.prototype.$http = axios
{{#if_in options "i18n"}}

const i18n = new I18n(Config.i18n)

i18n.bindLangQuery(router)
i18n.bindRequestHeader(axios)
{{/if_in}}

{{#if_in options "sentry"}}
const sentry = new Sentry(Config.sentry.dsn)

sentry.context(() => {
  new Vue({
    el: '#app',
    router,
    store,{{#if_in options "i18n"}}
    i18n: i18n.i18n,{{/if_in}}
    components: { App },
    template: '<App/>'
  })
})

{{else}}

new Vue({
  el: '#app',
  router,
  store,{{#if_in options "i18n"}}
  i18n: i18n.i18n,{{/if_in}}
  components: { App },
  template: '<App/>'
})
{{/if_in}}
