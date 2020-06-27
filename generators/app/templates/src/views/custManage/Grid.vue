<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-06-19 13:48:34
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-26 10:46:28
 * @Description: 客户管理-列表
 -->
<template>
  <div>
    <content-wrapper>
      <template slot="title">
        客户列表
      </template>
      <template slot="extra-btn">
        <renderBtn code="">
          <el-button type="primary" class="br-btn" @click="handleAdd">新增</el-button>
        </renderBtn>
        <renderBtn code="">
          <el-button type="primary" class="br-btn">导出</el-button>
        </renderBtn>
      </template>
      <template slot="grid">
        <el-table stripe :data="list.list" class="br-table" v-loading="loading">
          <el-table-column label="手机号" prop="phoneNo" min-width="100"></el-table-column>
          <el-table-column label="姓名" prop="name">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" @click="handleDetail(scope.row)">{{ scope.row.name }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="证件号" prop="idNo" min-width="150" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="用户来源" prop="custSource"></el-table-column>
          <el-table-column label="用户标签" prop="custLabel"></el-table-column>
          <el-table-column label="测试行高" prop="text" min-width="100">
            <template slot-scope="scope">
              <p> {{"测试行高多行展示，行高要缩小。原来23px，现改为16px。要用p包起来哦~"}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" prop="createDate" min-width="100"></el-table-column>
          <el-table-column label="操作" width="80" fixed="right">
            <template slot-scope="scope">
              <renderBtn code="cust_edit_btn">
                <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              </renderBtn>
            </template>
          </el-table-column>
        </el-table>

        <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />

      </template>
    </content-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
const custManage = namespace("custManage");
const common = namespace("common");
import ContentWrapper from "@/components/ContentWrapper.vue";
import { Pages } from "@/components";
@Component({
  components: {
    "content-wrapper": ContentWrapper,
    Pages
  }
})
export default class Grid extends Vue {
  @custManage.State list;
  @custManage.Action queryList;
  @custManage.State searchData;
  @custManage.Action saveSearchDataFN;
  @custManage.State loading;

  //新增
  handleAdd() {
    this.$router.push({
      path: "/custManage/add"
    });
  }
  //客户明细
  handleDetail(row) {
    this.$router.push({
      path: "/custManage/detail/" + row.id
    });
  }
  //编辑
  handleEdit(row) {
    this.$router.push({
      path: "/custManage/update",
      query: {
        type: "edit",
        id: row.id
      }
    });
  }
  changePageFn(val) {
    let parame = {
      ...this.searchData,
      pageNum: val.pageNum,
      pageSize: val.pageSize
    };
    this.queryList(parame);
    this.saveSearchDataFN(parame);
  }
}
</script>

<style scoped lang="scss">
</style>