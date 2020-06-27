<template>
  <B-dialog :title="dialogType=='add'?'新增':'编辑'" :visible="dialogVisible" width="460px" @close="handleCancel" v-dialogDrag>
    <el-form :model="dialogFrom" :rules="rules" ref="forms" label-width="90px" size="small">
      <el-form-item class="br-form-item-label" label="登录名" prop="userCode">
        <el-input class="br-input-large" placeholder="请输入英文或数字" v-model.trim="dialogFrom.userCode" v-if="dialogType=='add'"></el-input>
        <el-input class="br-input-large" placeholder="请输入登录名" v-model.trim="dialogFrom.userCode" v-if="dialogType=='edit'" disabled></el-input>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="机构" prop="orgName">
        <el-select class="br-select-large tree-select" v-model="dialogFrom.orgName" :popper-append-to-body="false" ref="treeSelect">
          <el-option value="null">
            <el-tree :data="orgList" @node-click="onLeavesClick" node-key="id" :props="defaultProps"></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="角色" prop="roleCode">
        <el-select class="br-select-large multi-select" v-model="dialogFrom.roleCode" multiple>
          <el-option v-for="item in roleList" :key="item.roleCode" :label="item.roleName" :value="item.roleCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="真实姓名" prop="realName">
        <el-input class="br-input-large" placeholder="请输入真实姓名" v-model.trim="dialogFrom.realName"></el-input>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="手机号" prop="phoneNo">
        <el-input class="br-input-large" placeholder="请输入手机号" v-model.trim="dialogFrom.phoneNo"></el-input>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="性别">
        <el-select class="br-select-large" v-model="dialogFrom.sex">
          <el-option key="1" label="男" value="1"></el-option>
          <el-option key="2" label="女" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="br-form-item-label" label="邮箱" prop="email">
        <el-input class="br-input-large" placeholder="请输入邮箱" v-model.trim="dialogFrom.email"></el-input>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <el-button type="primary" class="br-btn-large" @click="handleSubmit" :loading="btnloading">保存</el-button>
      <el-button class="br-btn-large" @click="handleCancel">取消</el-button>
    </template>
  </B-dialog>
</template>
<script lang="ts">
const PAGES = { pageNum: 1, pageSize: 10 };
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { USERMANAGE } from "@/store/modules/system/userManage";
import * as userManageAPI from "@/api/system/userManage";
import { renderOrganization } from "@/config/mUtils";
import { BDialog } from "@/components";
@Component({
  components: {
    BDialog
  }
})
export default class Dialog extends Vue {
  private dialogFrom = {
    userCode: "", // 登录名
    realName: "", // 真实姓名
    orgCode: "", // 机构名称CODE
    orgName: "", // 机构名称
    phoneNo: "", // 手机号
    email: "", // 邮箱
    roleCode: [], // 角色code
    sex: "1" // 性别
  };
  private btnloading: boolean = false;
  private dialogVisible: boolean = false;
  private rules: object = {
    userCode: [{ required: true, trigger: "blur", message: "请输入登录名" }],
    realName: [{ required: true, trigger: "blur", message: "请输入真实姓名" }],
    orgName: [{ required: true, trigger: "change", message: "请选择机构" }],
    roleCode: [{ required: true, trigger: "change", message: "请选择角色" }],
    phoneNo: [
      { trigger: "blur", message: "请输入手机号", required: true },
      { pattern: /^1\d{10}$/, trigger: "blur", message: "请输入正确格式的号码" }
    ]
  };
  private defaultProps = {
    children: "children",
    label: "label"
  };
  private roleList = [];
  private orgList = [];
  @Prop() dialogType;
  @Prop() dialogData;

  @Watch("dialogVisible")
  onChanged(val, oldVal) {
    if (val) {
      this.dialogFrom = Object.assign({}, this.dialogData);
    }
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

  created() {
    this.searchRolelistFN();
    this.searchqueryOrgListFN();
  }

  // 查询角色
  async searchRolelistFN() {
    let res = await userManageAPI.ROLEQUERYLIST({});
    if (res["code"] && res["code"] === 200) {
      this.roleList = res.data;
    }
  }

  // 查询机构
  async searchqueryOrgListFN() {
    let res = await userManageAPI.ALLORGANIZATION({});
    if (res["code"] && res["code"] === 200) {
      let data = res.data;
      this.orgList = renderOrganization(data);
    }
  }

  // 点击机构的节点
  onLeavesClick(data, node, el) {
    // if (node.isLeaf) {
    this.dialogFrom["orgName"] = data.label;
    this.dialogFrom["orgCode"] = data.id;
    this.$refs.treeSelect["handleClose"]();
    // }
  }

  open() {
    this.dialogVisible = true;
    this.$nextTick(() => {
      let $ele: any = this.$refs["forms"];
      $ele.clearValidate();
    });
  }

  close() {
    this.dialogVisible = false;
    let $ele: any = this.$refs["forms"];
    $ele.resetFields();
  }

  handleCancel() {
    let $ele: any = this.$refs["forms"];
    $ele.resetFields();
    this.close();
  }

  handleSubmit() {
    let $ele: any = this.$refs["forms"];
    $ele.validate(valid => {
      if (valid) {
        const formAPI =
          this.dialogType == "add"
            ? userManageAPI.USERADD
            : userManageAPI.USERUPDATE;
        this.btnloading = true;
        formAPI(this.dialogFrom).then(res => {
          this.btnloading = false;
          let code = res["code"];
          if (code == 200) {
            this.$message({
              type: "success",
              message: res["msg"]
            });
            this.handleCancel();
            this.searchDataFN(PAGES);
          }
        });
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.tree-select {
  .el-select-dropdown__item {
    height: auto;
    overflow: none;

    &.hover,
    &:hover {
      background-color: #fff;
    }
  }
}

.multi-select /deep/ .el-input__inner {
  min-height: 35px !important;
  line-height: 35px !important;
}

.br-dialog /deep/ .el-select-dropdown.el-popper {
  position: absolute !important;
  left: 0px !important;
}
</style>
