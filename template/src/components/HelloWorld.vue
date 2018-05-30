<template>
  <div class="hello">
    <ul class="link-list">
      <li v-for="(link, index) in links" :key="index">
        <a :href="link.url" v-text="link.name" target="_blank"></a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

interface Link {
  name: string
  url: string
}

@Component({})
export default class HelloWorld extends Vue {
  links: Link[] = [{
    name: 'Core Docs',
    url: 'https://vuejs.org'
  }, {
    name: 'vue-router',
    url: 'http://router.vuejs.org/'
  }, {
    name: 'vuex',
    url: 'http://vuex.vuejs.org/'
  }, {
    name: 'vue-loader',
    url: 'http://vue-loader.vuejs.org/'
  }, {
    name: 'awesome-vue',
    url: 'https://github.com/vuejs/awesome-vue'
  }, {
    name: 'vuex-class',
    url: 'https://github.com/ktsn/vuex-class'
  }, {
    name: 'vue-class-component',
    url: 'https://github.com/vuejs/vue-class-component'
  }]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.link-list {
  font-size: 16px;
}
</style>
