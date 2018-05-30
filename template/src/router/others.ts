export default [
  {
    name: 'HelloWorld',
    path: '/hello-world',
    component: resolve => require(['@/components/HelloWorld.vue'], resolve)
  }
]
