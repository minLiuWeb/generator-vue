<template>
  <B-dialog :title="dialogType=='add'?'新增':'编辑'" :visible="dialogVisible" width="400px" @close="handleCancel" v-dialogDrag>
    <el-form ref="forms" :model="dialogFrom" label-width="100px" :rules="rules" size="small">
      <el-form-item class="br-form-item-label" label="角色" prop="roleName">
        <el-input class="br-input" v-model.trim="dialogFrom.roleName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="角色类型" prop="roleType">
        <el-select class="br-select" v-model="dialogFrom.roleType" placeholder="请选择">
          <el-option label="业务类" value="1"></el-option>
          <el-option label="管理类" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="备注" prop="remark">
        <el-input class="br-textarea" type="textarea" placeholder="请输入" v-model.trim="dialogFrom.remark" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" class="br-btn-large" @click="handleSubmit" :loading="btnloading">保存</el-button>
      <el-button class="br-btn-large" @click="handleCancel">取消</el-button>
    </template>
  </B-dialog>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import * as roleManageAPI from "@/api/system/roleManage";
import { ROLEMANAGE } from "@/store/modules/system/roleManage";
import { BDialog } from "@/components";

@Component({
  components: {
    BDialog
  }
})
export default class Dialog extends Vue {
  dialogFrom = {};
  btnloading: boolean = false;
  dialogVisible: boolean = false;
  rules = {
    roleName: [{ required: true, message: "请输入角色", trigger: "blur" }],
    roleType: [{ required: true, message: "请选择角色类型", trigger: "change" }]
  };

  @Prop() dialogType;
  @Prop(Object) dialogData;

  @Watch("dialogVisible")
  onChanged(val, oldVal) {
    if (val) {
      this.dialogFrom = Object.assign({}, this.dialogData);
    }
  }

  async roleListFN() {
    ROLEMANAGE.saveLoadingFN(true);
    let res = await roleManageAPI.ROLEQUERYLIST({});
    if (res["code"] && res["code"] === 200) {
      ROLEMANAGE.saveRoleListFN(res.data);
      ROLEMANAGE.saveLoadingFN(false);
    }
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
  }

  handleSubmit() {
    let $ele: any = this.$refs["forms"];
    $ele.validate(valid => {
      if (valid) {
        this.btnloading = true;
        roleManageAPI.ADDANDUPDATEROLE(this.dialogFrom).then(res => {
          this.btnloading = false;
          let code = res["code"];
          if (code == 200) {
            this.$message({
              type: "success",
              message: res["msg"]
            });
            this.handleCancel();
            this.roleListFN();
          }
        });
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }

  handleCancel() {
    let $ele: any = this.$refs["forms"];
    $ele.resetFields();
    this.close();
  }

  beforeClose(done) {
    let $ele: any = this.$refs["forms"];
    $ele.resetFields();
    done();
  }
}
</script>

<style lang="scss">
</style>
