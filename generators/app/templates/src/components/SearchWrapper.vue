<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-01-09 11:28:52
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-20 20:23:46
 * @Description: 查询
 -->
<template>
  <div class="template-search">
    <div class="template-search-content">
      <div class="template-search-content-input-group">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class SearchWrapper extends Vue {}
</script>

<style scoped lang="scss">
</style>