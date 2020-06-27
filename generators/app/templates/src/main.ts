/*
 * @Author: xiaoyu.ren
 * @Date: 2020-03-29 18:43:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-27 18:05:36
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import store from "@/store";
import element, { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/commonLess/common.scss";
import "./assets/commonLess/components.scss";
import "./assets/iconFont/iconfont.css";
import "./assets/commonLess/wrapper.scss";
import ZkTable from "vue-table-with-tree-grid";
import moment from "moment";
import filters from "./utils/filter";
import bus from "./utils/eventBus";
import i18n from "./i18n/i18n";
import SlideVerify from "vue-monoplasty-slide-verify";
import echarts from 'echarts'

// 数据字典组件
import dictSelect from "@/components/DictSelect/index.vue";
// 按钮权限组件
import renderBtn from "@/components/renderBtn.vue";
// 右键菜单组件
import contextmenu from "@/components/ContextMenu/contextmenu";
const baseConfig = require("../baseConfig");
Vue.use(element);
Vue.use(ZkTable);
Vue.use(SlideVerify);
Vue.use(echarts)
Vue.config.productionTip = false;
Vue.component("dictSelect", dictSelect);
Vue.component("renderBtn", renderBtn);

// 引入mockjs
require("./mock");
//引入自定义指令
import "./directives";
//引入码值
import codeValue from "./utils/codeValue";
//新增全局的过滤器
for (var i in filters) {
    Vue.filter(i, filters[i]);
}
//国际化
Vue.use(element, {
    i18n: (key, value) => i18n.t(key, value)
});

//对$message进行二次封装
function EL_message(options) {
    /**
    @param {options.more} true：允许弹出多次
    */
    !options.more && (Message as any).closeAll();
    Message({
        message: options.message,
        type: options.type,
        duration: 2000,
        onClose: options.onClose
    });
}

Vue.prototype.$message = EL_message;
Vue.prototype.$Bmessage = EL_message;
Vue.prototype.$moment = moment;
Vue.prototype.$bus = bus;
Vue.prototype.$code = codeValue.getTextByCode;
Vue.prototype.$baseUrl = baseConfig.baseUrl;
Vue.prototype.$contextmenu = contextmenu;
Vue.prototype.$select = codeValue.getSelectByCode;
Vue.prototype.$pageSize = baseConfig.pageSize
console.log(Vue.prototype)
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
