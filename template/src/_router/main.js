export default [
  {
    name: 'home',
    path: '/home',
    alias: '/',
    component: resolve => require(['views/main/home/home.vue'], resolve)
  }
]
