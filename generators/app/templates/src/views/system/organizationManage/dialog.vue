<template>
  <el-dialog v-dialogDrag title="新增" :visible.sync="dialogVisible" width="470px" :close-on-click-modal="false" @close="close" class="br-dialog">
    <el-form :model="dialogData" label-width="100px" :rules="rules" ref="forms" size="small">
      <el-form-item class="br-form-item-label" label="当前节点名称">
        <el-input class="br-input-large" v-model.trim="dialogData.organizationOneInfoName" auto-complete="off" disabled></el-input>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="当前节点编码">
        <el-input class="br-input-large" v-model.trim="dialogData.organizationOneInfoCode" auto-complete="off" disabled></el-input>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="机构名称" prop="orgName">
        <el-input class="br-input-large" placeholder="请输入机构名称" v-model.trim="dialogData.orgName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="机构说明" prop="remark">
        <el-input class="br-textarea-large" type="textarea" placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="dialogData.remark" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="br-dialog-footer">
      <el-button type="primary" size="small" @click="submitDataFN('forms')" class="br-btn-large" :loading="btnloading">保存</el-button>
      <el-button @click="resetForm('forms')" size="small" class="br-btn-large">取消</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { namespace, State, Action } from "vuex-class";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
const organizationManage = namespace("organizationManage");
@Component({})
export default class Dialog extends Vue {
  @organizationManage.Action queryOrgList;
  @organizationManage.Action queryAddOrg;

  @Prop() dialogData;

  dialogVisible: boolean = false;
  btnloading: boolean = false;

  rules = {
    orgName: [
      { required: true, message: "请输入机构名称", trigger: "blur" },
      { max: 20, message: "最多输入20个字符!", trigger: "blur" }
    ],
    remark: [{ max: 50, message: "最多输入50个字符!", trigger: "blur" }]
  };
  created() {}
  //关闭弹框
  close() {
    this.dialogVisible = false;
  }
  // 打开弹框
  open() {
    this.dialogVisible = true;
  }
  // 确定新增
  submitDataFN(formName) {
    this.$refs[formName]["validate"](valid => {
      if (valid) {
        let param = {
          //   operateType: "add",
          orgPcode: this.dialogData.organizationOneInfoCode,
          orgName: this.dialogData.orgName,
          remark: this.dialogData.remark
        };
        this.submit(param);
      }
    });
  }
  // 提交表单
  submit(params) {
    this.btnloading = true;
    this.queryAddOrg(params).then(res => {
      this.btnloading = false;
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: res.msg
        });
        this.resetForm("forms"); // 关闭表单并清空
        this.queryOrgList(); // 获取全部机构
      }
    });
  }
  // 清空表单
  resetForm(formName) {
    this.$refs[formName]["resetFields"]();
    this.close();
  }
}
</script>

<style lang="scss">
</style>
