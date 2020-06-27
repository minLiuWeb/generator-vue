<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-02-12 14:13:14
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-04-29 10:25:05
 * @Description: 
 -->
<template>
  <div>
    <search-wrapper>
      <el-form :inline="true" :model="formParams" label-width="65px" ref="searchForm" size="small">
        <el-form-item class="br-form-item-label" label="权限名称" prop="resName">
          <el-input class="br-input" placeholder="请输入权限名称" v-model.trim="formParams.resName"></el-input>
        </el-form-item>

        <el-form-item label-width="0px">
          <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
          <el-button class="br-btn template-reset-btn" @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </search-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchWrapper from "@/components/SearchWrapper.vue";
import { namespace, Action } from "vuex-class";
const authorityManage = namespace("authorityManage");
@Component({
  components: {
    "search-wrapper": SearchWrapper
  }
})
export default class Search extends Vue {
  @authorityManage.Action queryAllResource;
  public formParams = {
    resName: ""
  };
  created() {
    this.queryAllResource();
  }
  search(): void {
    this.queryAllResource(this.formParams);
  }
  resetForm(): void {
    this.$refs.searchForm["resetFields"]();
  }
}
</script>

<style scoped lang="scss">
</style>