<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-03-21 10:28:25
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-25 11:29:49
 * @Description: 客户管理-编辑
 -->
<template>
  <div class="template-container">
    <Child :currentData="updateFormData" />
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
export default class updateIndex extends Vue {
  updateFormData = {
    name: "张磊",
    phoneNo: "15112908909",
    idNo: "110430197803240818",
    custSource: "2",
    custLabel: ["自然人"],
    linkMan: [
      {
        name: "张学晶",
        phoneNo: "13990054592"
      },
      {
        name: "杜森",
        phoneNo: "15800545926"
      }
    ]
  };
}
</script>

<style scoped lang="scss">
</style>