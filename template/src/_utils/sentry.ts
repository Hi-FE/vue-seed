import Vue, { VueConstructor } from 'vue/types'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

declare module 'vue/types/vue' {
  interface Vue {
    config: {
      errorHandler(err: Error, vm: Vue, info: string):void
    }
  }
}

class Sentry {
  dsn: string
  raven: Raven.RavenStatic | null

  constructor({ dsn }: { dsn: string }) {
    this.dsn = dsn
    this.raven = null
  }

  install(Vue: VueConstructor<Vue>): Sentry {
    const { dsn } = this

    if (dsn) {
      // 使用 sentry 官方插件
      Raven.config(dsn).addPlugin(RavenVue, Vue).install()

      // 重新处理 errorHandler，覆盖 sentry 插件已处理的 errorHandler，覆盖
      this.dealVueErrHandler(Vue)
    }

    return this
  }

  context(fn:()=>void): Sentry {
    const { raven } = this

    if (raven) raven.context(fn)
    else fn()

    return this
  }

  dealVueErrHandler(Vue: VueConstructor<Vue>): Sentry {
    const errorHandler = Vue.config.errorHandler || function () {}

    Vue.config.errorHandler = function (err: Error, vm: Vue, info: string) {
      // 控制台输出 error
      console.error(err)

      const data = {
        routeName: vm.$route.name,
        routePath: vm.$route.path
      }

      // 插入新参数
      Raven.setExtraContext(data)

      // 执行 RavenVue 实现的 errorHandler
      // 采集错误
      errorHandler(err, vm, info)

      // 删除新参数
      Raven.setExtraContext()
    }

    return this
  }
}

export default Sentry
