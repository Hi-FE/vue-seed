/* eslint no-param-reassign: "off" */
/* eslint no-console : "off" */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

const STORAGE_KEY = '_i18n_language'

// 多语言
Vue.use(VueI18n)

class I18n {
  constructor({ locale } = {}) {
    this.locale = locale
    this.loadedLanguages = []
    this.i18n = this.getI18nInstance()
    this.body = document.querySelector('body')

    this.bindI18nMethods()

    // 加载默认语言
    this.loadLanguageAsync('default')
  }

  /**
   * 获取 VueI18n 实例
   * @return {VueI18n} VueI18n 实例
   */
  getI18nInstance() {
    const { locale, i18n } = this

    if (i18n) return i18n

    const localLanguage = this.getLocalStorageLanguage()

    return new VueI18n({
      // 读取设置的语言，其次再取浏览器默认语言, 最后再取默认语言
      locale: localLanguage || navigator.language || locale,
      fallbackLocale: locale,
      silentTranslationWarn: true,
      messages: {}
    })
  }

  /**
   * 获取本地存储的语言设置
   * @return {String} 存储语言
   */
  getLocalStorageLanguage() {
    let localLanguage = null

    try { localLanguage = localStorage.getItem(STORAGE_KEY) } catch (e) { console.error('[i18n] localLanguage error', e) }

    return localLanguage
  }

  /**
   * 设置语言
   * @param {String} lang 指定语言
   */
  setI18nLanguage(lang = this.locale) {
    const { body, i18n } = this

    i18n.locale = lang

    // 更新 body 节点 lang 属性
    body.setAttribute('lang', lang)

    return lang
  }

  /**
   * 异步加载语言包
   * @param {String} bnstype 指定业务类型
   * @param {String} lang 指定语言
   */
  loadLanguageAsync(bnstype, lang = this.i18n.locale) {
    const { loadedLanguages, i18n } = this
    const loaded_sign = `${lang}.${bnstype}`

    if (!loadedLanguages.includes(loaded_sign)) {
      return import(`./${lang}/${bnstype}.json`).then(msgs => {
        const msg = i18n.getLocaleMessage(lang)

        i18n.setLocaleMessage(lang, { ...msg, ...msgs })
        loadedLanguages.push(loaded_sign)

        return this.setI18nLanguage(lang)
      }).catch(() => {})
    }

    return Promise.resolve(this.setI18nLanguage(lang))
  }

  /**
   * Vue 实例属性 $i18n， 绑定语言处理相关方法
   * $i18n.changeLocale / $i18n.resetLocale
   */
  bindI18nMethods() {
    const { locale } = this

    /**
     * Vue 实例修改语言
     * @param {String} locale 指定语言
     */
    VueI18n.prototype.changeLocale = function (lce = locale) {
      this.locale = lce

      // 存储本地
      try { localStorage.setItem(STORAGE_KEY, lce) } catch (e) { console.error('[i18n] saveCurrentLanguage error', e) }

      return lce
    }

    /**
     * Vue 实例重置语言
     */
    VueI18n.prototype.resetLocale = function () {
      return this.changeLocale(locale)
    }
  }

  /**
   * 绑定路由参数 lang
   * @param {VueRouter} router VueRouter 实例
   */
  bindLangQuery(router) {
    const { i18n, locale } = this
    const replace = router.replace.bind(router)
    let flag = false

    router.replace = function (...args) {
      flag = true
      return replace(...args)
    }

    // 监听路由 lang 参数，动态引入语言包
    router.beforeEach((to, from, next) => {
      const lang = to.query.lang || from.query.lang

      if (from.query.lang && !to.query.lang) {
        return next({ name: to.name, query: { ...to.query, lang }, replace: flag })
      }

      // 加载新语言
      if (lang !== i18n.locale) {
        const languages = []

        // 加载默认语言包
        if (lang && lang !== locale) {
          languages.push(this.loadLanguageAsync('default', lang))

          // 加载路由语言包
          languages.push(this.loadLanguageAsync(to.meta.bnstype, lang))
        }

        // 加载路由默认语言包
        if (to.meta.bnstype) languages.push(this.loadLanguageAsync(to.meta.bnstype, locale))

        return Promise.all(languages).then(() => {
          next()
        })
      }

      next()
    })

    router.afterEach(() => {
      flag = false
    })
  }

  /**
   * 绑定接口参数 lang
   * @param {axios} axios axios 实例
   */
  bindRequestHeader(axios) {
    if (!axios) return

    const { i18n } = this

    axios.interceptors.request.use(config => {
      // 所有请求类型，补充渠道参数到请求 url 上
      config.params = { ...config.params, lang: i18n.locale }

      return config
    })
  }

  install({ router, axios }) {
    this.bindLangQuery(router)
    this.bindRequestHeader(axios)
  }
}

export default I18n
