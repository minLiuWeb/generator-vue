<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-03-21 10:28:25
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-28 14:43:27
 * @Description: 客户管理-新增
 -->
<template>
  <div class="template-container">
    <Child :currentData="addFormData" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Child from "./child.vue";
@Component({
  components: {
    Child
  }
})
export default class addIndex extends Vue {
  addFormData = {
    name: "",
    phoneNo: "",
    custSource: "",
    custLabel: [],
    linkMan: []
  };
}
</script>

<style scoped lang="scss">
</style>