<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-03-21 10:28:25
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-04-06 18:29:58
 * @Description: 客户管理-详情
 -->
<template>
  <div class="template-container">
    <content-wrapper>
      <template slot="grid">
        <div class="sub-title">基本信息</div>

        <div class="detail_content">

          <div class="detail_content_item">
            <span class="detail_content_item_label">姓名</span>
            <span class="detail_content_item_content">{{currentData.name}}</span>
          </div>
          <div class="detail_content_item">
            <span class="detail_content_item_label">手机号</span>
            <span class="detail_content_item_content">{{currentData.phoneNo}}</span>
          </div>

          <div class="detail_content_item">
            <span class="detail_content_item_label">证件号</span>
            <span class="detail_content_item_content">{{currentData.idNo}}</span>
          </div>

          <div class="detail_content_item">
            <span class="detail_content_item_label">用户来源</span>
            <span class="detail_content_item_content">{{currentData.custSource}}</span>
          </div>

          <div class="detail_content_item">
            <span class="detail_content_item_label">用户标签</span>
            <span class="detail_content_item_content">{{currentData.custLabel}}</span>
          </div>

          <div class="detail_content_item">
            <span class="detail_content_item_label">注册日期</span>
            <span class="detail_content_item_content">{{currentData.createDate}}</span>
          </div>

        </div>

        <div class="sub-title">联系人信息</div>

        <el-table :data="currentData.linkMan" stripe class="br-table" style="margin:10px auto 0;">
          <el-table-column label="姓名" prop="name">
            <template slot-scope="scope">
              <span v-if="!scope.row.flag">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="phoneNo">
            <template slot-scope="scope">
              <span v-if="!scope.row.flag">{{scope.row.phoneNo}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template slot="bottom-btn">
        <el-button class="br-btn" size="small" type="primary" @click="handleClose">关闭</el-button>
      </template>
    </content-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import ContentWrapper from "@/components/ContentWrapper.vue";

@Component({
  components: {
    "content-wrapper": ContentWrapper
  }
})
export default class detail extends Vue {
  currentData: any = {
    name: "张磊",
    phoneNo: "15112908909",
    idNo: "110430197803240818",
    custSource: "2",
    custLabel: "自然人",
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
  //关闭
  handleClose() {
    this.$bus.$emit("closeTag", {
      path: this.$route.path
    });
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="scss">
</style>