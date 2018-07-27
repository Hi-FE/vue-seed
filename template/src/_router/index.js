import Vue from 'vue';
import Router from 'vue-router';

import main from './main'
import others from './others'

let routes = []

Vue.use(Router)

{{#if_in options "i18n"}}
// 业务类型 划分路由
const bns_types = [
  { type: 'main', routes: main },
  { type: 'others', routes: others }
]

// 每个路由添加业务类型标记
// 用于动态加载对应语言包
const putBusinessType = (sign, routes) => {
  return routes.map(route => {
    route.meta = route.meta || {}
    route.meta.bnstype = sign
    return route
  })
}

bns_types.forEach(item => {
  routes = routes.concat(putBusinessType(item.type, item.routes))
})

{{else}}
routes = routes.concat(main, others)

{{/if_in}}
const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      const position = { x: 0, y: 0 }

      if (to.hash) {
        position.selector = to.hash
      }

      return position
    }
  },
  routes
})

export default router