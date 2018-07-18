/* eslint no-param-reassign: "off" */
/* eslint no-console : "off" */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Config from 'src/_config'

const STORAGE_KEY = '_i18n_language'

// 注册 $i18n.changeLocale
VueI18n.prototype.changeLocale = function (locale = Config.i18n.locale) {
  this.locale = locale

  // 存储本地
  try { localStorage.setItem(STORAGE_KEY, locale) } catch (e) { console.error('[i18n] saveCurrentLanguage error', e) }

  return locale
}

// 注册 $i18n.resetLocale
VueI18n.prototype.resetLocale = function () {
  return this.changeLocale(Config.locale)
}

// 多语言
Vue.use(VueI18n)

// 本地存储语言
let localLanguage = ''
try { localLanguage = localStorage.getItem(STORAGE_KEY) } catch (e) { console.error('[i18n] localLanguage error', e) }

const i18n = new VueI18n({
  // 读取设置的语言，其次再取浏览器默认语言, 最后再取默认语言
  locale: localLanguage || navigator.language || Config.i18n.locale,
  fallbackLocale: Config.i18n.locale,
  silentTranslationWarn: true,
  messages: {}
})

const loadedLanguages = []

function setI18nLanguage (lang) {
  i18n.locale = lang
  return lang
}

// 异步加载语言包
function loadLanguageAsync (lang = Config.i18n.locale) {
  if (!loadedLanguages.includes(lang)) {
    return import(`./lang_${lang}.js`).then(msgs => {
      i18n.setLocaleMessage(lang, msgs.default)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    })
  }
  return Promise.resolve(setI18nLanguage(lang))
}

// 加载默认语言
Config.i18n.loaded.forEach((locale) => {
  loadLanguageAsync(locale)
})

// 绑定路由参数
i18n.bindLangParams = function (router) {
  const replace = router.replace.bind(router)
  let flag = false

  router.replace = function (...args) {
    flag = true
    return replace(...args)
  }

  // 监听路由 lang 参数，动态引入语言包
  router.beforeEach((to, from, next) => {
    const locale = to.params.locale || from.params.locale

    if (from.params.locale && !to.params.locale) {
      return next({ name: to.name, params: { ...to.params, locale }, replace: flag })
    }

    // 加载新语言
    if (locale !== i18n.locale) {
      return loadLanguageAsync(locale).then(() => {
        next()
      })
    }

    next()
  })

  router.afterEach(() => {
    flag = false
  })
}

// 绑定请求头参数
i18n.bindRequestHeader = function (axios) {
  if (!axios) return

  axios.interceptors.request.use(config => {
    // 所有请求类型，补充渠道参数到请求 url 上
    config.params = { ...config.params, language: i18n.locale }

    return config
  })
}

export default i18n
