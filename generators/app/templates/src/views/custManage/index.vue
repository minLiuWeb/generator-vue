<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-03-21 10:28:25
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-28 14:08:29
 * @Description: 客户管理
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
  name: "custManage",
  components: {
    Search,
    Grid
  }
})
export default class custManage extends Vue {}
</script>

<style scoped lang="scss">
</style>