<!--
 * @Author: zhiqiang.qiao
 * @Date: 2020-05-25 13:48:34
 * @LastEditors: zhiqiang.qiao
 * @LastEditTime: 2020-05-25 13:48:34
 * @Description: 分页案例
 -->
<template>
    <div>
        <content-wrapper>
            <template slot="title">
                分页案例
            </template>
            <template slot="grid">
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
    public pageData = {
        pageNum: 1,
        pageSize: 10,
        total: 55
    };

    changePageFn(val) {
        this.pageData.pageNum = val.pageNum;
        this.pageData.pageSize = val.pageSize;
    }
}
</script>

<style scoped lang="scss">
</style>