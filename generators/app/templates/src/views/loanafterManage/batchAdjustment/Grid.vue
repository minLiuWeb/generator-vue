<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-06-19 13:48:34
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-04-06 12:57:11
 * @Description: 批量调额-列表
 -->
<template>
    <div>
        <content-wrapper>
            <template slot="title">
                列表信息
            </template>
            <template slot="extra-btn">
                <renderBtn code="">
                    <el-button type="primary" class="br-btn">导入</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" v-loading="loading">
                    <el-table-column label="卡号/账户" prop="cardNo" min-width="120" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="姓名" prop="name"></el-table-column>
                    <el-table-column label="身份证号" prop="idNo" min-width="150"></el-table-column>
                    <el-table-column label="产品名称" prop="proName"></el-table-column>
                    <el-table-column label="网点机构" prop="dotOrgan"></el-table-column>
                    <el-table-column label="调整前额度" prop="beforeAmt" min-width="100">
                        <template slot-scope="scope">
                            {{scope.row.beforeAmt|money}}
                        </template>
                    </el-table-column>
                    <el-table-column label="调整后额度" prop="afterAmt" min-width="120">
                        <template slot-scope="scope">
                            {{scope.row.afterAmt|money}}
                        </template>
                    </el-table-column>
                    <el-table-column label="发放日期" prop="grantDate" min-width="100"></el-table-column>
                    <el-table-column label="导入时间" prop="importTime" min-width="150"></el-table-column>
                    <el-table-column label="导入批次号" prop="importNo" min-width="100"></el-table-column>
                </el-table>

                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />

            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
const batchAdjustment = namespace("batchAdjustment");
import ContentWrapper from "@/components/ContentWrapper.vue";
import { Pages } from "@/components";

@Component({
    components: {
        "content-wrapper": ContentWrapper,
        Pages
    }
})
export default class Grid extends Vue {
    @batchAdjustment.State list;
    @batchAdjustment.Action queryList;
    @batchAdjustment.State searchData;
    @batchAdjustment.Action saveSearchDataFN;
    @batchAdjustment.State loading;

    changePageFn(val) {
        let parame = {
            ...this.searchData,
            pageNum: val.pageNum,
            pageSize: val.pageSize
        };
        this.queryList(parame);
        this.saveSearchDataFN(parame);
    }
}
</script>

<style scoped lang="scss">
</style>