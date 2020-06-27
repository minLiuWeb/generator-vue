<template>
    <div>
        <search-wrapper>
            <el-form :inline="true" :model="formParams" label-width="65px" ref="searchForm" size="small">
                <el-form-item class="br-form-item-label" label="登录名" prop="userCode">
                    <el-input class="br-input" placeholder="请输入登录名" v-model.trim="formParams.userCode"></el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="真实姓名" prop="realName">
                    <el-input class="br-input" placeholder="请输入真实姓名" v-model.trim="formParams.realName"></el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="手机号" prop="phoneNo">
                    <el-input class="br-input" placeholder="请输入手机号" v-model.trim="formParams.phoneNo"></el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="邮箱" prop="email">
                    <el-input class="br-input" placeholder="请输入邮箱" v-model.trim="formParams.email"></el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="角色" prop="roleCode">
                    <el-select v-model="formParams.roleCode" placeholder="请选择角色" filterable class="br-select">
                        <el-option v-for="(item,index) in roleList" :key="index" :value="item.roleCode"
                                   :label="item.roleName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="机构" prop="orgName">
                    <el-select v-model="formParams.orgName" class="br-select tree-select"
                               :popper-append-to-body="false" ref="treeSelect" placeholder="请选择机构">
                        <el-option value="null">
                            <el-tree :data="orgList" @node-click="onLeavesClick" node-key="id" :props="defaultProps">
                            </el-tree>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="0px">
                    <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
                    <el-button class="br-btn template-reset-btn" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </search-wrapper>
    </div>
</template>

<script lang="ts">
    const PAGES = {pageNum: 1, pageSize: 10};
    import {Vue, Component} from "vue-property-decorator";
    import SearchWrapper from "@/components/SearchWrapper.vue";
    import * as userManageAPI from "@/api/system/userManage";
    import {USERMANAGE} from "@/store/modules/system/userManage";
    import {renderOrganization} from "@/config/mUtils";

    export interface IformParams {
        userCode: string,
        realName: string,
        phoneNo: string | number,
        email: string,
        roleCode: string,
        orgName: string,
        orgCode: string
    }

    @Component({
        components: {
            "search-wrapper": SearchWrapper
        }
    })
    export default class Search extends Vue {
        private formParams: IformParams = {
            userCode: "",
            realName: "",
            phoneNo: "",
            email: "",
            roleCode: "",
            orgName: "",
            orgCode: ""
        };
        private defaultProps: object = {
            children: "children",
            label: "label"
        };
        private roleList: Array<object> = [];
        private orgList: Array<object> = [];

        created() {
            this.searchDataFN(PAGES);
            this.searchRolelistFN();
            this.searchqueryOrgListFN();
        };

        // 查询角色
        async searchRolelistFN() {
            let res = await userManageAPI.ROLEQUERYLIST({});
            if (res['code'] && res['code'] === 200) {
                this.roleList = res.data
            }
        }

        // 查询机构
        async searchqueryOrgListFN() {
            let res = await userManageAPI.ALLORGANIZATION({});
            if (res['code'] && res['code'] === 200) {
                let data = res.data;
                this.orgList = renderOrganization(data);
            }
        }

        // 查询数据
        async searchDataFN(value: object) {
            USERMANAGE.listLoading(true);
            let res = await userManageAPI.GETUSERLIST(value);
            if (res['code'] && res['code'] === 200) {
                USERMANAGE.queryList(res.data)
                USERMANAGE.saveSearchFN(value)
                USERMANAGE.listLoading(false);
            }
        }

        search(): void {
            let params = {
                ...PAGES,
                ...this.formParams
            };
            this.searchDataFN(params)
        }

        resetForm(): void {
            this.formParams.orgCode = "";
            this.$refs.searchForm["resetFields"]();
        }

        onLeavesClick(data, node, el) {
            this.formParams.orgName = data.label;
            this.formParams.orgCode = data.id;
            this.$refs.treeSelect["handleClose"]();
        }
    }
</script>

<style scoped lang="scss">
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
</style>