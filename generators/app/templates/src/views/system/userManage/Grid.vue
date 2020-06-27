<template>
  <div>
    <content-wrapper>
      <template slot="title">
        <!-- 用户列表 -->
        {{$t("smallTitle.userList")}}
      </template>
      <template slot="extra-btn">
        <renderBtn code="">
          <el-button class="br-btn" type="primary" @click="handleAdd">新增</el-button>
        </renderBtn>
      </template>
      <template slot="grid">
        <el-table stripe :data="list.list" class="br-table" v-loading="loading">
          <el-table-column label="登录名" prop="userCode"></el-table-column>
          <el-table-column label="机构" prop="orgName" min-width="90" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="角色" prop="roleName" min-width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="真实姓名" prop="realName"></el-table-column>
          <el-table-column label="手机号" prop="phoneNo" min-width="100"></el-table-column>
          <el-table-column label="性别" prop="sex">
            <template slot-scope="scope">
              <span>{{scope.row.sex==Sex.boy?"男":"女"}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <el-link :type="scope.row.status == Status.success?'success':'danger'" :underline="false">{{
                                scope.row.status== Status.success?'已启用':'已停用' }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" prop="email" min-width="120" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <renderBtn code="">
                <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              </renderBtn>

              <renderBtn code="">
                <el-popconfirm title="确认重置该用户密码吗？" @onConfirm="headDelOrResetFN('reset',scope)">
                  <el-button type="text" size="mini" slot="reference">重置密码</el-button>
                </el-popconfirm>
              </renderBtn>

              <renderBtn code="">
                <el-popconfirm title="确认删除该用户吗？" @onConfirm="headDelOrResetFN('del',scope)">
                  <el-button type="text" size="mini" slot="reference">删除</el-button>
                </el-popconfirm>
              </renderBtn>

            </template>
          </el-table-column>
        </el-table>

        <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />

        <child-dialog ref="dialog" :dialogData="dialogData" :dialogType="dialogType" />
      </template>
    </content-wrapper>
  </div>
</template>

<script lang="ts">
const PAGES = { pageNum: 1, pageSize: 10 };
import { Vue, Component } from "vue-property-decorator";
import ContentWrapper from "@/components/ContentWrapper.vue";
import childDialog from "./dialog.vue";
import { Pages } from "@/components";
import { USERMANAGE } from "@/store/modules/system/userManage";
import * as userManageAPI from "@/api/system/userManage";

enum Status {
  danger = "0",
  success = "1"
}
enum Sex {
  boy = "1",
  girl = "2"
}

@Component({
  components: {
    "content-wrapper": ContentWrapper,
    childDialog,
    Pages
  }
})
export default class Grid extends Vue {
  public dialogData: object = {};
  private dialogType: string = "1";
  private Status = Status;
  private Sex = Sex;

  get list() {
    return USERMANAGE.list;
  }

  get loading() {
    return USERMANAGE.loading;
  }

  // 查询数据
  async searchDataFN(value: object) {
    USERMANAGE.listLoading(true);
    let res = await userManageAPI.GETUSERLIST(value);
    if (res["code"] && res["code"] === 200) {
      USERMANAGE.queryList(res.data);
      USERMANAGE.saveSearchFN(value);
      USERMANAGE.listLoading(false);
    }
  }
  openDialog(str, objdata) {
    this.dialogType = str;
    this.dialogData = objdata;
    let $els = this.$refs["dialog"];
    $els["open"]();
  }

  // 新增
  handleAdd() {
    let rowObj = {
      userCode: "", // 登录名
      realName: "", // 真实姓名
      orgCode: "", // 机构名称CODE
      orgName: "", // 机构名称
      phoneNo: "", // 手机号
      email: "", // 邮箱
      roleCode: [], // 角色code
      sex: "1" // 性别
    };
    this.openDialog("add", rowObj);
  }

  // 编辑
  handleEdit(row) {
    let rowObj = {
      userCode: row.userCode, // 登录名
      realName: row.realName, // 真实姓名
      orgCode: row.orgCode, // 机构名称CODE
      orgName: row.orgName, // 机构名称
      phoneNo: row.phoneNo, // 手机号
      email: row.email, // 邮箱
      roleCode: row.roleCode, // 角色code
      sex: row.sex // 性别
    };
    this.openDialog("edit", rowObj);
  }

  // 【删除】【重置密码】
  headDelOrResetFN(type, scope) {
    let data = { userId: scope.row.userCode };
    let api =
      type === "del"
        ? userManageAPI.DELETEUSER(data)
        : userManageAPI.USERRESETPWD(data);
    api.then(res => {
      if (res["code"] && res["code"] == 200) {
        this.$message({
          type: "success",
          message: res["msg"]
        });
        this.searchDataFN(PAGES);
      }
    });
  }
  // 分页
  changePageFn(val) {
    let parame = {
      ...USERMANAGE.saveSearchData,
      pageNum: val.pageNum,
      pageSize: val.pageSize
    };
    this.searchDataFN(parame);
  }
}
</script>

<style scoped lang="scss">
</style>