<template>
  <div>
    <a class="link" href="javascript:;" @click="$router.push({ name: 'HelloWorld' })">Learn more</a>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {
}
</script>

<style scoped lang="stylus">
  .link {
    font-size: 16px;
    color: _main;
    text-decoration: underline;
  }
</style>
