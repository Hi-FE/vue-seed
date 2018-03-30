// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from 'src/_router'
import store from 'src/_store'
import config from 'src/_config'{{#if_in options "sentry"}}
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'{{/if_in}}
import 'src/_plugins'
import App from './App'

Vue.config.productionTip = false;

/* eslint-disable no-new */
const initVue = () => {
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  })
}
{{#if_in options "sentry"}}
if (config.sentry.dsn) {
  Raven
    .config(config.sentry.dsn)
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
