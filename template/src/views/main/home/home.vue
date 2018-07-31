<template>
  <div>
    This is home page{{#if_in options "i18n"}}
    <span v-text="$t('test')"></span>{{/if_in}}
  </div>
</template>

<style scoped lang="stylus">

</style>

{{#typescript}}
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
}
</script>
{{else}}
<script>
export default {
  name: 'home',
  data: function () {
    return {}
  }
}
</script>
{{/typescript}}
{{#if_in options "i18n"}}

<i18n>
  {
    "zh": {
      "test": "哈哈哈哈"
    }
  }
</i18n>
{{/if_in}}