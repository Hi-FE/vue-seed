import Vue from 'vue'
import Router from 'vue-router'

import shelves from './shelves'
import others from './others'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [].concat(shelves, others)
})
