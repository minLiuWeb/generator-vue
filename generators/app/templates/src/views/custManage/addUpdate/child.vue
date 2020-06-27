<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-03-21 10:28:25
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-26 11:02:03
 * @Description: 客户管理-新增/编辑 内容
 -->
<template>
  <div v-dictType="['cust_source']">
    <content-wrapper>
      <template slot="grid">
        <div class="sub-title">基本信息</div>
        <el-form :inline="true" :model="currentData" label-width="80px" ref="forms" :rules="rules" size="small">
          <div class="detail_content">
            <el-form-item label="姓名" prop="name" class="br-form-item-label detail_content_item">
              <el-input class="br-input" placeholder="请输入姓名" v-model.trim="currentData.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNo" class="br-form-item-label detail_content_item">
              <el-input class="br-input" placeholder="请输入手机号" v-model.trim="currentData.phoneNo"></el-input>
            </el-form-item>
            <el-form-item label="证件号" prop="idNo" class="br-form-item-label detail_content_item">
              <el-input class="br-input" placeholder="请输入证件号" v-model.trim="currentData.idNo"></el-input>
            </el-form-item>
            <el-form-item label="用户来源" prop="custSource" class="br-form-item-label detail_content_item">
              <dictSelect :dictType="'cust_source'" @change="(val)=>changeSelect(val,'custSource')" v-model="currentData.custSource" :disabled="$route.query.type=='edit'" class="br-select" />
            </el-form-item>
            <el-form-item label="用户标签" prop="custLabel" class="br-form-item-label detail_content_item">
              <el-checkbox-group v-model="currentData.custLabel" class="br-checkbox">
                <el-checkbox label="店主" key="1">店主</el-checkbox>
                <el-checkbox label="自然人" key="2">自然人</el-checkbox>
                <el-checkbox label="员工" key="3">员工</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="注册日期" prop="createDate" class="br-form-item-label detail_content_item">
              <el-date-picker v-model="currentData.createDate" type="date" value-format="yyyy-MM-dd" class="br-datepicker" :clearable="false">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
        <div class="sub-title">联系人信息</div>
        <el-button type="primary" class="br-btn" @click="handleAddLinkMan">新增</el-button>

        <el-table :data="currentData.linkMan" stripe class="br-table" style="margin:10px auto 0;">
          <el-table-column label="姓名" prop="name">
            <template slot-scope="scope">
              <span v-if="!scope.row.flag">{{scope.row.name}}</span>
              <el-input v-else v-model.trim="scope.row.name" class="br-input"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="phoneNo">
            <template slot-scope="scope">
              <span v-if="!scope.row.flag">{{scope.row.phoneNo}}</span>
              <el-input v-else v-model.trim="scope.row.phoneNo" class="br-input"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleEditLinkMan(scope.row)" :disabled="scope.row.flag">编辑</el-button>
              <el-button type="text" size="mini" @click="handleRemoveLinkMan(scope.$index)">删除</el-button>
              <el-button type="text" size="mini" @click="handleSaveLinkMan(scope.row)" :disabled="!scope.row.name || !scope.row.phoneNo || !scope.row.flag">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template slot="bottom-btn">
        <el-button class="br-btn" type="primary" @click="handleSave" :loading="btnloading">保存</el-button>
        <el-button class="br-btn" @click="handleCancel">取消</el-button>
      </template>
    </content-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ContentWrapper from "@/components/ContentWrapper.vue";
@Component({
  components: {
    "content-wrapper": ContentWrapper
  }
})
export default class child extends Vue {
  @Prop() currentData;

  btnloading: boolean = false;
  rules = {
    name: [{ required: true, message: "请输入姓名" }],
    phoneNo: [
      { required: true, message: "请输入手机号" },
      { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不正确" }
    ],
    idNo: [
      { required: true, message: "请输入证件号" },
      { pattern: /\d{17}[0-9xX]/, message: "证件号码格式不正确" }
    ],
    custSource: [
      { required: true, message: "请选择用户来源", trigger: "change" }
    ],
    custLabel: [{ required: true, message: "请选择用户标签" }]
  };

  //新增联系人信息
  handleAddLinkMan() {
    this.currentData.linkMan.push({
      name: "",
      phoneNo: "",
      flag: true
    });
  }
  changeSelect(val, type) {
    this.currentData[type] = val;
  }

  //编辑联系人信息
  handleEditLinkMan(row) {
    this.$set(row, "flag", true);
  }
  //删除联系人信息
  handleRemoveLinkMan(index) {
    this.currentData.linkMan.splice(index, 1);
  }
  //保存联系人信息
  handleSaveLinkMan(row) {
    this.$set(row, "flag", false);
  }
  //保存
  handleSave() {
    let $ele: any = this.$refs["forms"];
    $ele.validate(valid => {
      if (valid) {
        const validArr = this.currentData.linkMan.map(item => item.flag);

        if (validArr.indexOf(true) != -1) {
          this.$message({
            message: "存在未保存的联系人",
            type: "warning"
          });
        } else {
          this.btnloading = true;
          //axios...
        }
      }
    });
  }
  //取消
  handleCancel() {
    this.$bus.$emit("closeTag", {
      name:
        this.$route.query.type == "edit" ? "custManageUpdate" : "custManageAdd"
    });
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="scss">
</style>