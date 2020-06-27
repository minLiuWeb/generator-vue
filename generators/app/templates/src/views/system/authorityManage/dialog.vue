<template>
  <el-dialog v-dialogDrag :title="dialogType==1?'新增':'编辑'" :visible.sync="dialogVisible" :close-on-click-modal="false" :before-close="beforeClose" width="480px" class="br-dialog">
    <el-form ref="forms" :model="dialogFrom" label-width="100px" :rules="rules" size="small">
      <el-form-item class="br-form-item-label" label="使用类型" prop="resOperTypeId">
        <el-radio-group v-model="dialogFrom.resOperTypeId">
          <el-radio class="br-radio" label="1" :disabled="dialogType!='1'">目录</el-radio>
          <el-radio class="br-radio" label="2" :disabled="dialogType!='1'">菜单</el-radio>
          <el-radio class="br-radio" label="3" :disabled="dialogType!='1'">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="权限名称" prop="resName">
        <el-input class="br-input-large" v-model.trim="dialogFrom.resName"></el-input>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="类型" prop="resTypeId">
        <el-select class="br-select-large" v-model="dialogFrom.resTypeId" placeholder="请选择">
          <el-option label="业务类" value="1"></el-option>
          <el-option label="管理类" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="排序号" prop="orders">
        <el-input class="br-input-large" v-model.trim="dialogFrom.orders"></el-input>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="图标" prop="icon" v-if="dialogFrom.resOperTypeId==1">
        <b-icon-selector v-model="dialogFrom.icon" family="iconfont" />
      </el-form-item>
      <el-form-item class="br-form-item-label" label="父节点名称" prop="resPcode">
        <el-select class="br-select-large" v-model="dialogFrom.resPcode" placeholder="请选择">
          <el-option v-for="item in authorityListArry" :key="item.resCode" :label="item.resName" :value="item.resCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="br-form-item-label" label="访问Url" v-if="dialogFrom.resOperTypeId!=1 && dialogFrom.resOperTypeId==2" prop="resUrl">
        <el-input class="br-input-large" v-model.trim="dialogFrom.resUrl"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="br-dialog-footer">
      <el-button type="primary" class="br-btn-large" @click="submitForm" :loading="btnloading">保存</el-button>
      <el-button class="br-btn-large" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { namespace, State, Action } from "vuex-class";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
const authorityManage = namespace("authorityManage");
import { BIconSelector } from "@/components";

@Component({
  components: {
    BIconSelector
  }
})
export default class Dialog extends Vue {
  dialogVisible: boolean = false;
  btnloading: boolean = false;

  dialogFrom = {};
  rules = {
    resOperTypeId: [
      { required: true, message: "请选择使用类型", trigger: "change" }
    ],
    resName: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
    resFatherId: [
      { required: true, message: "请选择父节点", trigger: "change" }
    ],
    resUrl: [{ required: true, message: "请输入Url", trigger: "blur" }],
    resTypeId: [{ required: true, message: "请选择类型", trigger: "change" }]
  };
  @Prop() dialogType;
  @Prop() authorityListArry;
  @Prop(Object) dialogData;
  @authorityManage.State checkDicUseType;
  @authorityManage.State checkDicType;
  @authorityManage.Action queryAllResource;
  @authorityManage.Action queryFatherList;
  @authorityManage.Action queryAddAuthority;
  @authorityManage.Action queryUpdateAuthority;

  @Watch("dialogVisible")
  private onChanged(val, oldVal) {
    if (val) {
      this.dialogFrom = Object.assign({}, this.dialogData);
    }
  }

  created() {
    this.queryFatherList();
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
  cancel() {
    this.$refs["forms"]["resetFields"]();
    this.close();
  }
  submitForm() {
    this.$refs["forms"]["validate"](valid => {
      if (valid) {
        const formAPI =
          this.dialogType == "1"
            ? this.queryAddAuthority
            : this.queryUpdateAuthority;

        this.btnloading = true;
        formAPI(this.dialogFrom).then(res => {
          this.btnloading = false;
          let code = res.code;
          if (code == 200) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.queryAllResource({ resName: "" });
            this.cancel();
          }
        });
      } else {
        return false;
      }
    });
  }
  beforeClose(done) {
    this.$refs["forms"]["resetFields"]();
    done();
  }
}
</script>

<style lang="scss">
</style>
