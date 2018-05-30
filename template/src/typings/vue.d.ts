import Vue from 'vue'
import VueRoute, { Route } from 'vue-router'
import { AxiosStatic } from 'axios'

declare module 'vue/types/vue' {
  interface VueConstructor {
  }
  interface VueConfiguration {
  }
  interface Vue {
    $http: AxiosStatic
    $route: Route
    $router: VueRoute
  }
}
