export default [
  {
    name: 'home',
    path: '/home',
    alias: '/',
    component: (resolve:any) => require(['views/main/home/home.vue'], resolve)
  }
]
