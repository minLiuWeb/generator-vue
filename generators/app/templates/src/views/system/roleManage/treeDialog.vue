<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-02-21 14:54:30
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-27 10:41:11
 * @Description: 
 -->
<template>
    <el-dialog v-dialogDragWidth title="角色授权" :visible.sync="dialogVisible" :close-on-click-modal="false"
               :before-close="beforeClose" width="300px" class="br-dialog">
        <div>
            <el-tree ref="tree" :data="allResouse" :show-checkbox="true" node-key="id" @check="handleCheck"
                     :default-expand-all="true" :default-checked-keys="checkDataArry" :props="defaultProps">
            </el-tree>
        </div>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="handlesubmit" :loading="btnloading">保存</el-button>
            <el-button class="br-btn-large" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
    import {Vue, Component, Watch, Prop} from "vue-property-decorator";
    import * as roleManageAPI from '@/api/system/roleManage'

    @Component({})
    export default class roleManageTreeDialog extends Vue {

        dialogVisible: boolean = false;
        btnloading: boolean = false;
        defaultProps: object = {
            children: "children",
            label: "label"
        };
        submitID = [];
        @Prop() checkDataArry;
        @Prop() allResouse;
        @Prop() tempObj;

        open() {
            this.dialogVisible = true;
        }

        close() {
            this.dialogVisible = false;
        }

        handleCheck(a, b) {
            var tempArry: any = [];
            // 处理选中的数据
            for (let i = 0; i < b.halfCheckedNodes.length; i++) {
                tempArry.push(b.halfCheckedNodes[i].id);
            }
            let submit = tempArry.concat(b.checkedKeys);
            this.updateSelectData(submit);
        }

        updateSelectData(arry) {
            this.submitID = arry;
        }

        handlesubmit() {
            let params = {
                roleCode: this.tempObj.roleCode,
                resourceList: this.submitID
            };
            this.btnloading = true;
            roleManageAPI.AUTHORITYROLE(params).then(res => {
                this.btnloading = false;
                let code = res['code'];
                if (code == 200) {
                    this.$message({
                        type: "success",
                        message: res['msg']
                    });
                    this.cancel();
                }
            });
        }

        // 取消
        cancel() {
            this.resetKey();
            this.close();
        }

        // 清空选择的key
        resetKey() {
            let $ele: any = this.$refs["tree"];
            $ele.setCheckedKeys([]);
        }

        beforeClose(done) {
            this.resetKey();
            done();
        }
    }
</script>
<style lang="scss">
</style>
