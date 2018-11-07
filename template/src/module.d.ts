interface Window {
  // growingio 所需全局变量
  _vds: any
}

declare var process: {
  env: {
    NODE_ENV: string
  }
}
{{#if_in options "sentry"}}

declare module 'raven-js/plugins/vue' {
  import Vue from 'vue'
  import { RavenStatic } from 'raven-js'
  function vuePlugin(raven: RavenStatic, vue: Vue): RavenStatic;
  export = vuePlugin;
}
{{/if_in}}
