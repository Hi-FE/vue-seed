interface Window {
  // growingio 所需全局变量
  _vds: any
}

declare module "*.vue" {
  import Vue from "vue";

  export default Vue;
}

declare module 'raven-js/plugins/vue' {
  import Vue from 'vue';
  import { RavenStatic } from 'raven-js';
  function vuePlugin(raven: RavenStatic, vue: Vue): RavenStatic;
  export = vuePlugin;
}

declare var process : {
  env: {
    NODE_ENV: string
  }
}