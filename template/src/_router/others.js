export default [
  {
    name: 'HelloWorld',
    path: '/helloworld',
    component: resolve => require(['src/_components/HelloWorld.vue'], resolve)
  }
]
