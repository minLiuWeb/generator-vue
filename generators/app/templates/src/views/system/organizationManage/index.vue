<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-01-24 15:00:28
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-27 11:56:19
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
  name: "organizationManage",
  components: {
    Grid
  }
})
export default class organizationManage extends Vue {}
</script>

<style scoped lang="scss">
</style>
