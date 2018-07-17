import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Config from 'src/_config'

// 多语言
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: Config.i18n.locale,
  fallbackLocale: Config.i18n.locale,
  silentTranslationWarn: true,
  messages: {}
})

const loadedLanguages = []

function setI18nLanguage (lang) {
  i18n.locale = lang
  return lang
}

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

loadLanguageAsync(Config.i18n.locale)

/* eslint no-param-reassign: "off" */
i18n.bindLangParams = function (router) {
  const replace = router.replace.bind(router)
  let flag = false

  router.replace = function (...args) {
    flag = true
    return replace(...args)
  }

  // 监听路由 lang 参数，动态引入语言包
  router.beforeEach((to, from, next) => {
    const lang = to.params.lang || from.params.lang

    if (from.params.lang && !to.params.lang) {
      return next({ name: to.name, params: { ...to.params, lang }, replace: flag })
    }

    loadLanguageAsync(lang).then(() => next())
  })

  router.afterEach(() => {
    flag = false
  })
}

export default i18n
