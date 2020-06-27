<template>
  <div class="login_page" :style="{'height':winH+'px'}">
    <div class="bg-box"></div>
    <div class="login-logo">
      <img class="logoImg" :src="logoUrl" />
      <div><%= systemName %></div>
    </div>
    <section class="form_contianer">
      <div class="manage_tip">
        <div>登录</div>
      </div>
      <div class="login-container">
        <el-form :model="formParams" :rules="rules" ref="forms" class="login-form">
          <el-form-item prop="username">
            <el-input v-model.trim="formParams.username" placeholder="用户名" @keyup.enter.native="handleLogin" class="br-input-login"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model.trim="formParams.password" @keyup.enter.native="handleLogin" class="br-input-login"></el-input>
          </el-form-item>
          <el-form-item v-if="showVerify">
            <div class="verify-content">
              <slide-verify ref="slideblock" :l="42" :r="10" :w="310" :h="155" slider-text="向右滑动" :imgs="verifyImgs" @success="onSuccess" @fail="onFail" @refresh="onRefresh" @fulfilled="onFulfilled"></slide-verify>
              <div class="verify-message" v-html="verifyMessage">
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin" class="submit_btn" :loading="btnloading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
import {
  renderMenu,
  getMenu,
  getBtn,
  setStore,
  removeStore
} from "@/config/mUtils.js";
import { Base64 } from "js-base64";
import md5 from "md5";
const baseConfig: any = require("../../../baseConfig");
const login = namespace("login");
import img1 from "@/assets/images/verify/img1.jpg";
import img2 from "@/assets/images/verify/img2.jpg";
import img3 from "@/assets/images/verify/img3.jpg";
import img4 from "@/assets/images/verify/img4.jpg";
import img5 from "@/assets/images/verify/img5.jpg";
import img6 from "@/assets/images/verify/img6.jpg";
import img7 from "@/assets/images/verify/img7.jpg";
import img8 from "@/assets/images/verify/img8.jpg";
import img9 from "@/assets/images/verify/img9.jpg";

@Component
export default class Login extends Vue {
  @login.Action queryLogin;

  btnloading: boolean = false;
  verifyFlag: boolean = false;
  verifyMessage: string = "";
  showVerify: boolean = false;
  winH = document.body.clientHeight;
  logoUrl = `${baseConfig.logoUrl}`;
  verifyImgs: Array<string> = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9
  ];
  formParams = {
    username: "",
    password: ""
  };
  rules = {
    username: [{ required: true, message: "请输入用户名" }],
    password: [{ required: true, message: "请输入密码" }]
  };
  created() {
    removeStore("menu");
    removeStore("btn");
    removeStore("token");
    removeStore("userInfo");
  }

  mounted() {
    const that = this;
    that.winH =
      document.body.clientHeight < 665 ? 765 : document.body.clientHeight;

    window.onresize = () => {
      return (() => {
        that.winH =
          document.body.clientHeight < 665 ? 765 : document.body.clientHeight;
      })();
    };
  }
  onSuccess() {
    this.verifyFlag = true;
    this.verifyMessage =
      "<span style='color:#67c23a;font-size:14px;font-weight:bold;'><i class='el-icon-circle-check' style='font-size:14px;'></i>验证成功</span>";

    this.btnloading = true;
    this.queryLogin({
      username: this.formParams.username,
      password: md5(this.formParams.password)
    }).then(res => {
      this.btnloading = false;
      if (res["code"] == 200) {
        this.$message({
          type: "success",
          message: res.msg
        });
        setStore("locale", "zh");
        this.$i18n.locale = "zh";
        // 存储菜单
        setStore("token", res.data.token);
        let loginData = {
          userName: res.data.userName,
          orgName: res.data.orgName,
          roleNames: res.data.roleNames
        };

        setStore("userInfo", Base64.encode(JSON.stringify(loginData)));
        // 存储菜单
        let tempMenu = getMenu(res.data.permission);
        let tempRenderMenuData = renderMenu(tempMenu);

        setStore("menu", Base64.encode(JSON.stringify(tempRenderMenuData)));
        // 存储按钮权限
        let tempBtn = getBtn(res.data.permission);

        setStore("btn", Base64.encode(JSON.stringify(tempBtn)));
        this.$router.push("/home");
      } else {
        this.$refs.slideblock["reset"]();
      }
    });
  }

  onFail() {
    this.verifyFlag = false;
    this.verifyMessage =
      "<span style='color:#f56c6c;font-size:14px;font-weight:bold;'><i class='el-icon-circle-close' style='font-size:14px;'></i>验证失败，请重新验证</span>";
  }
  onRefresh() {
    this.verifyFlag = false;
    this.verifyMessage = "";
  }
  onFulfilled() {
    this.verifyFlag = false;
    this.verifyMessage = "";
  }
  handleLogin(): void {
    let $ele: any = this.$refs.forms;
    $ele.validate(valid => {
      if (valid) {
        this.showVerify = true;
        if (!this.verifyFlag) {
          this.$message({
            type: "warning",
            message: "请先通过验证"
          });
          return;
        }
      }
    });
  }
}
</script>

<style scoped lang="scss">
.login_page {
  width: 100%;
  background-color: #324057;
  position: relative;
  background-image: url("../../assets/images/background.png");
  background-size: cover;
  .login-logo {
    position: absolute;
    top: 20px;
    left: 20px;
    .logoImg {
      height: 36px;
    }
    div {
      display: inline-block;
      height: 18px;
      line-height: 18px;
      color: #fff;
      font-size: 18px;
      vertical-align: middle;
      border-left: 1px solid #fff;
      padding-left: 10px;
      margin-left: 10px;
    }
    img {
      vertical-align: middle;
    }
  }
}

.manage_tip {
  text-align: left;
  font-family: ArialMT;
  font-weight: 400;
  color: #fff;
  margin-bottom: 38px;
  div {
    display: inline-block;
    line-height: 56px;
    border-bottom: 3px solid #4da1ff;
    font-size: 28px;
  }
}
.form_contianer {
  width: 310px;
  position: absolute;
  top: 100px;
  right: 200px;
  padding: 25px;
  text-align: center;

  .submit_btn {
    width: 100%;
    font-size: 14px;
  }
}
.verify-content {
  position: relative;
  .verify-message {
    position: absolute;
    left: 50%;
    top: 62px;
    transform: translateX(-50%);
    color: #fff;
    span {
      font-size: 14px;
    }
  }
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>