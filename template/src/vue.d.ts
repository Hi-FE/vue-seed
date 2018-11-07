import Vue from 'vue'
import { AxiosStatic } from 'axios'

declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosStatic
    $changeI18nLocale(locale: string): Vue
    $resetI18nLocale(): Vue
  }
}
