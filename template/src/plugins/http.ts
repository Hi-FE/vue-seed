import axios from 'axios'

/* eslint no-param-reassign: "off" */
export default {
  install (Vue) {
    Vue.prototype.$http = axios
  }
}
