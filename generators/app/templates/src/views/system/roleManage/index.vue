<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-01-24 10:27:34
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-27 11:55:54
 * @Description: 
 -->
<template>
  <div class="template-container">
    <Grid></Grid>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Grid from "./Grid.vue";
@Component({
  name: "roleManage",
  components: {
    Grid
  }
})
export default class roleManage extends Vue {}
</script>

<style scoped lang="scss">
</style>
