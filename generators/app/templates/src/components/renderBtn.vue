<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-03-27 17:12:31
 * @LastEditors: min.liu
 * @LastEditTime: 2020-04-28 15:24:07
 * @Description: 按钮权限组件
 -->
<template >
    <!-- v-if="localCodes.includes(code)" -->
    <span class="permission-btn">
        <slot></slot>
    </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Base64 } from "js-base64";
import { getStore } from "@/utils/utils";
@Component
export default class renderBtn extends Vue {
    @Prop() code;

    localCodes: any = [];

    created() {
        let tempCodes = getStore("btn")
            ? JSON.parse(Base64.decode(getStore("btn")))
            : [];
        this.localCodes = tempCodes;
    }
}
</script>

<style lang="scss" scoped>
.permission-btn + .permission-btn {
    margin-left: 10px;
}
</style>
