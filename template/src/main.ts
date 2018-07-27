// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-new */
import Vue from 'vue'
import router from 'src/_router'
import axios from 'axios'
import store from 'src/_store'{{#if_in_or options "i18n" "sentry" "growingio"}}
import Config from 'src/_config'{{/if_in_or}}{{#if_in options "i18n"}}
import I18n from 'src/_i18n'{{/if_in}}{{#if_in options "sentry"}}
import Sentry from 'src/_utils/sentry'{{/if_in}}{{#if_in options "growingio"}}
import Growingio from 'src/_utils/growingio'{{/if_in}}
import App from './App.vue'

Vue.config.productionTip = false;

// 注册 $http
Vue.prototype.$http = axios
{{#if_in options "i18n"}}

const i18n = new I18n(Config.i18n)
i18n.install({ router, axios })
{{/if_in}}
{{#if_in options "growingio"}}

const growingio = new Growingio(Config.growingio)
if (process.env.NODE_ENV === 'production') growingio.install()
{{/if_in}}
{{#if_in options "sentry"}}

const sentry = new Sentry(Config.sentry)
if (process.env.NODE_ENV === 'production') sentry.install(Vue)

sentry.context(() => {
  new Vue({
    router,
    store,{{#if_in options "i18n"}}
    i18n: i18n.i18n,{{/if_in}}
    render: h => h(App)
  }).$mount('#app')
})
{{else}}

new Vue({
  router,
  store,{{#if_in options "i18n"}}
  i18n: i18n.i18n,{{/if_in}}
  render: h => h(App)
}).$mount('#app')
{{/if_in}}
