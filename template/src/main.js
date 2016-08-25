import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import VueRouter from 'vue-router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

Vue.use(VueRouter){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const router = new VueRouter({
  history            : true,
  saveScrollPosition : true,
  root               : '/'
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}


router.map({
  '/' : {component : require('./views/home.vue')}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}


const App = Vue.extend(require('./App.vue')){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
router.start(App, 'body'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
