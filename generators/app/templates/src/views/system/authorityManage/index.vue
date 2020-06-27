<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-01-24 10:42:52
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-27 11:56:40
 * @Description: 
 -->
<template>
  <div class="template-container">
    <Search></Search>
    <Grid></Grid>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Grid from "./Grid.vue";
import Search from "./Search.vue";
@Component({
  name: "authorityManage",
  components: {
    Search,
    Grid
  }
})
export default class authorityManage extends Vue {}
</script>

<style scoped lang="scss">
</style>
