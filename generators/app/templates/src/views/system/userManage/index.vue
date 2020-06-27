<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-01-11 11:11:36
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-27 11:55:00
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
import Search from "./Search.vue";
import Grid from "./Grid.vue";
@Component({
  name: "userManage",
  components: {
    Search,
    Grid
  }
})
export default class userManage extends Vue {}
</script>

<style scoped lang="scss">
</style>