// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import config from './config'{{#if_in options "sentry"}}

import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'{{/if_in}}

import App from './App.vue'
import './app.ts'

Vue.config.productionTip = false

// eruda
;(function () {
  if (!/eruda=true/.test(window.location.search)) {
    return
  }

  require.ensure(['eruda'], require => {
    let eruda: any = require('eruda')
    eruda.init()
  })
})()

/* eslint-disable no-new */
const initVue = () => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app-box')
}

{{#if_in options "sentry"}}
if (process.env.NODE_ENV === 'production' && config.sentry.dsn) {
  Raven
    .config(config.sentry.dsn, {
      environment: process.env.IS_PROD_ENV ? 'prod' : 'test'
    })
    .addPlugin(RavenVue, Vue)
    .install()
    .context(() => {
      initVue()
    })
} else {
  initVue()
}
{{else}}

initVue()
{{/if_in}}
