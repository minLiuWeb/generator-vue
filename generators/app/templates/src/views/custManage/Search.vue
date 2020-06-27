<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-06-19 13:46:56
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-04-29 10:24:51
 * @Description: 客户管理-查询
 -->
<template>
  <div>
    <search-wrapper>
      <el-form :inline="true" :model="formParams" label-width="65px" ref="searchForm" size="small">
        <el-form-item label="手机号" prop="phoneNo" class="br-form-item-label">
          <el-input class="br-input" placeholder="请输入手机号" v-model.trim="formParams.phoneNo"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="name" class="br-form-item-label">
          <el-input class="br-input" placeholder="请输入姓名" v-model.trim="formParams.name"></el-input>
        </el-form-item>

        <el-form-item label="证件号" prop="cardNo" class="br-form-item-label">
          <el-input class="br-input" placeholder="请输入证件号" v-model.trim="formParams.cardNo"></el-input>
        </el-form-item>

        <el-form-item label="用户来源" prop="custSource" class="br-form-item-label">
          <el-input class="br-input" placeholder="请输入用户来源" v-model.trim="formParams.custSource"></el-input>
        </el-form-item>

        <el-form-item label="用户标签" prop="custLabel" class="br-form-item-label">
          <el-input class="br-input" placeholder="请输入用户标签" v-model.trim="formParams.custLabel"></el-input>
        </el-form-item>

        <el-form-item label="创建日期" prop="timeSelect" class="br-form-item-label">
          <el-date-picker v-model="formParams.timeSelect" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="br-datepicker" :clearable="false">
          </el-date-picker>
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
import { namespace, Action } from "vuex-class";

import SearchWrapper from "@/components/SearchWrapper.vue";
import HiddenForm from "@/components/HiddenForm.vue";
const custManage = namespace("custManage");
@Component({
  components: {
    "search-wrapper": SearchWrapper,
    "hidden-form": HiddenForm
  }
})
export default class Search extends Vue {
  @custManage.Action queryList;
  @custManage.State searchData;
  @custManage.Action saveSearchDataFN;

  public formParams = {
    phoneNo: "", //手机号
    name: "", //姓名
    cardNo: "", //证件号

    timeSelect: [], //创建日期
    startDate: "", //创建日期-start
    endDate: "", //创建日期-ened

    custSource: "", //用户来源
    custLabel: "" //用户标签
  };
  created() {
    this.saveSearchDataFN({
      pageNum: 1,
      pageSize: 10
    });
    this.queryList(this.searchData);
  }

  search(): void {
    let val = this.formParams.timeSelect;
    this.formParams.startDate = val[0] != null ? val[0] : "";
    this.formParams.endDate = val[1] != null ? val[1] : "";

    let params = {
      ...this.searchData,
      ...this.formParams
    };

    delete params.timeSelect;

    this.queryList(params);
    this.saveSearchDataFN(params);
  }
  resetForm(): void {
    this.formParams.startDate = "";
    this.formParams.endDate = "";

    this.$refs.searchForm["resetFields"]();
  }
}
</script>

<style scoped lang="scss">
</style>