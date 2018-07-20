// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from 'src/_router'
import axios from 'axios'
import store from 'src/_store'{{#if_in options "sentry"}}
import Config from 'src/_config'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'{{/if_in}}{{#if_in options "i18n"}}
import I18n from 'src/_i18n'{{/if_in}}
import App from './App'

Vue.config.productionTip = false;

// 注册 $http
Vue.prototype.$http = axios
{{#if_in options "i18n"}}

const i18n = new I18n(Config.i18n)

i18n.bindLangQuery(router)
i18n.bindRequestHeader(axios)
{{/if_in}}

/* eslint-disable no-new */
const initVue = () => {
  new Vue({
    el: '#app',
    router,
    store,{{#if_in options "i18n"}}
    i18n,{{/if_in}}
    components: { App },
    template: '<App/>'
  })
}
{{#if_in options "sentry"}}
if (Config.sentry.dsn) {
  Raven
    .config(Config.sentry.dsn)
    .addPlugin(RavenVue, Vue)
    .install()
    .context(() => {
      initVue()
    });
} else {
  initVue()
}
{{else}}

initVue()
{{/if_in}}
