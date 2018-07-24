import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

class Sentry {
  constructor({dsn}) {
    this.dsn = dsn
    this.raven = null
  }

  install(Vue) {
    const { dsn } = this

    if (dsn) {
      // 使用 sentry 官方插件
      Raven.config(dsn).addPlugin(RavenVue, Vue).install()

      // 重新处理 errorHandler，覆盖 sentry 插件已处理的 errorHandler，覆盖
      this.dealVueErrHandler(Vue)
    }

    return this
  }

  context(fn) {
    const { raven } = this

    if (raven) raven.context(fn)
    else fn()

    return this
  }

  dealVueErrHandler(Vue) {
    const errorHandler = Vue.config.errorHandler || function () {}

    Vue.config.errorHandler = function (err, vm, info) {
      // 控制台输出 error
      console.error(err)

      const data = {
        routeName: vm.$route.name,
        routePath: vm.$route.path
      }

      // 插入新参数
      Raven.setExtraContext(data)

      // 执行 RavenVue 实现的 errorHandler
      errorHandler(err, vm, info)

      // 删除新参数
      const context = Raven.getContext()
      const extra = { ...context.extra }
      for (const key in extra) delete extra[key]
      Raven.setExtraContext()
      Raven.setExtraContext(extra)
    }
  }
}

export default Sentry
