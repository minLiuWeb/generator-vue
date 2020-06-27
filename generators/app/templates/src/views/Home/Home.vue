<template>
  <div class="template-container">
    <div class="contentBox">
      <img style="width: 100%; height: 100%" :src="url" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  url = require("../../assets/images/home.png");
}
</script>

<style scoped lang="scss">
.template-container {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>