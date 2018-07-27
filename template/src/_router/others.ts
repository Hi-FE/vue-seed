export default [
  {
    name: 'HelloWorld',
    path: '/helloworld',
    component: (resolve:any) => require(['src/_components/HelloWorld.vue'], resolve)
  }
]
