<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-06-19 11:21:16
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-27 11:57:13
 * @Description: 批量调额
 -->
<template>
  <div class="template-container">
    <Search></Search>
    <Grid></Grid>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Search from "./Search.vue";
import Grid from "./Grid.vue";
@Component({
  name: "batchAdjustment",
  components: {
    Search,
    Grid
  }
})
export default class batchAdjustment extends Vue {}
</script>

<style scoped lang="scss">
</style>