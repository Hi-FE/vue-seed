import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

class Sentry {
  constructor({dsn}) {
    this.dsn = dsn
    this.raven = null
    this.init(dsn)
  }

  init(dsn) {
    if (dsn) this.raven = Raven.config(dsn).addPlugin(RavenVue, Vue).install()

    return this
  }

  context(fn) {
    const { raven } = this

    if (raven) raven.context(fn)
    else fn()

    return this
  }
}

export default Sentry