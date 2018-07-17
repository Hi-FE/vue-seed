import Vue from 'vue';
import Router from 'vue-router';

import shelves from './shelves'
import others from './others'

Vue.use(Router)

/* eslint no-param-reassign: "off" */
const routes = [].concat(shelves, others){{#if_in options "i18n"}}.map(function (route) {
  route.path = `/:lang?${route.path}`
  return route
}){{/if_in}}

export default new Router({
  mode: 'history',
  base: '/',
  routes
});
