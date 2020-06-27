s<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                角色列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="">
                    <el-button class="br-btn" type="primary" @click="handleAdd">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="roleList" class="br-table" v-loading="loading">
                    <el-table-column label="角色" prop="roleName"></el-table-column>
                    <el-table-column label="角色类型" prop="roleType">
                        <template slot-scope="scope">
                            <span>{{ scope.row.roleType==RoleType.business?"业务类":"管理类"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" prop="remark" min-width="100"
                                     :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作" width="130" fixed="right">
                        <template slot-scope="scope">
                            <renderBtn code="">
                                <el-button type="text" size="mini" @click="handleClick(scope.row)">授权</el-button>
                            </renderBtn>
                            <renderBtn code="">
                                <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                            </renderBtn>

                            <renderBtn code="">
                                <el-popconfirm title="确认删除该角色吗？" @onConfirm="handleRemove(scope)">
                                    <el-button type="text" size="mini" slot="reference">删除</el-button>
                                </el-popconfirm>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>

                <child-dialog ref="dialog" :dialogData="dialogData" :dialogType="dialogType"/>

                <tree-dialog ref="treeDialog" class="common-dialog" :allResouse="allResourceList" :tempObj="tempObj"
                             :checkDataArry="checkDataArry"/>
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import ContentWrapper from "@/components/ContentWrapper.vue";
    import childDialog from "./dialog.vue";
    import treeDialog from "./treeDialog.vue";
    import * as roleManageAPI from '@/api/system/roleManage';
    import {ROLEMANAGE} from "@/store/modules/system/roleManage";
    import { renderResouce } from "@/config/mUtils";


    enum RoleType {
        business = '1',
        Management = '2'
    }

    @Component({
        components: {
            "content-wrapper": ContentWrapper,
            childDialog,
            treeDialog
        }
    })
    export default class Grid extends Vue {
        private RoleType = RoleType;
        private checkDataArry: any[] = []; // 树状菜单
        private tempObj: object = {}; // 当前roleCode
        private dialogType = "add"; // 默认是add
        private dialogData: object = {
            roleName: "",
            remark: "",
            roleType: ""
        };

        get roleList() {
            return ROLEMANAGE.roleList;
        }
        get loading() {
            return ROLEMANAGE.loading
        }
        get allResourceList() {
            return ROLEMANAGE.allResourceList;
        }

        async roleListFN() {
            ROLEMANAGE.saveLoadingFN(true)
            let res = await roleManageAPI.ROLEQUERYLIST({});
            if (res['code'] && res['code'] === 200) {
                ROLEMANAGE.saveRoleListFN(res.data)
                ROLEMANAGE.saveLoadingFN(false)
            }
        }

        created() {
            this.roleListFN()
        }

        openDialog(str, objdata) {
            this.dialogType = str;
            this.dialogData = objdata;

            let $els = this.$refs["dialog"];
            $els["open"]();
        }

        handleAdd() {
            let rowObj = {
                roleName: "",
                remark: "",
                roleType: ""
            };
            this.openDialog("add", rowObj);
        }

        handleEdit(row) {
            let rowObj = {
                roleCode: row.roleCode,
                roleName: row.roleName,
                remark: row.remark,
                roleType: row.roleType
            };
            this.openDialog("edit", rowObj);
        }

        handleClick(row) {
            this.tempObj = {roleCode: row.roleCode};
            //菜单数组
            roleManageAPI.ROLEMENU({roleCode: row.roleCode}).then(res => {
                if (res['code'] && res['code'] === 200) {
                    this.checkDataArry = res.data;
                    // var tempArry: any[] = [];
                    // for (let i = 0; i < res.data.length; i++) {
                    //     tempArry.push(res.data[i]["resId"]);
                    // }
                    // this.checkDataArry = tempArry;
                    roleManageAPI.AUTHORITYLIST({roleType: row.roleType}).then(res => {
                        if (res['code'] && res['code'] === 200) {
                            ROLEMANAGE.saveAllResourceListFN(renderResouce(res.data))
                        }
                    });
                    let $els = this.$refs["treeDialog"];
                    $els["open"]();
                }
            })
        }

        handleRemove(scope) {
            roleManageAPI.DELETEROLE({roleCode: scope.row.roleCode}).then(res => {
                let code = res['code'];
                if (code == 200) {
                    this.$message({
                        type: "success",
                        message: res['msg']
                    });
                    this.roleListFN();
                }
            });
        }
    }
</script>

<style scoped lang="scss">
</style>
