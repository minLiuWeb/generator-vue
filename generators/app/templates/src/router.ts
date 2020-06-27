/*
 * @Author: xiaoyu.ren
 * @Date: 2019-06-19 11:23:34
<<<<<<< .mine
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-27 16:56:51
||||||| .r53457
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-26 12:10:04
=======
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-27 13:48:24
>>>>>>> .r53683
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "login",
            component: () => import("@/views/Login/Login.vue")
        },
        {
            path: "/",
            name: "wrapper",
            component: () => import("@/components/Wrapper.vue"),
            children: [
                {
                    path: "/home",
                    name: "home",
                    component: () => import("@/views/Home/Home.vue"),
                    meta: {
                        name: "首页"
                    }
                },
                {
                    path: "/loanafterManage/batchAdjustment",
                    name: "batchAdjustment",
                    component: () =>
                        import("@/views/loanafterManage/batchAdjustment/index.vue"),
                    meta: {
                        name: "批量调额"
                    }
                },
                {
                    path: "/custManage/index",
                    name: "custManage",
                    component: () => import("@/views/custManage/index.vue"),
                    meta: {
                        name: "客户管理"
                    }
                },
                {
                    path: "/custManage/add",
                    name: "custManageAdd",
                    component: () => import("@/views/custManage/addUpdate/addIndex.vue"),
                    meta: {
                        name: "新增客户"
                    }
                },
                {
                    path: "/custManage/update",
                    name: "custManageUpdate",
                    component: () =>
                        import("@/views/custManage/addUpdate/updateIndex.vue"),
                    meta: {
                        name: "编辑客户"
                    }
                },
                {
                    path: "/custManage/detail/:id",
                    name: "custManageDetail", //详情多页签对比
                    component: () => import("@/views/custManage/detail.vue"),
                    meta: {
                        name: "客户详情",
                        multi: true
                    }
                },
                {
                    path: "/tableDemo",
                    name: "tableDemo",
                    component: () => import("@/views/components/BTable-demo.vue"),
                    meta: {
                        name: "表格demo"
                    }
                },
                {
                    path: "/pagerDemo",
                    name: "pagerDemo",
                    component: () => import("@/views/components/Pager-demo.vue"),
                    meta: {
                        name: "分页demo"
                    }
                },
                {
                    path: "/uploadAndDownload",
                    name: "uploadAndDownload",
                    component: () => import("@/views/components/uploadAndDownload-demo.vue"),
                    meta: {
                        name: "echart案例"
                    }
                },
                {
                    path: "/echartDemo",
                    name: "EchartDemo",
                    component: () => import("@/views/components/echart-demo.vue"),
                    meta: {
                        name: "echart案例"
                    }
                },
                {
                    path: "/BDialog-demo",
                    name: "BDialog-demo",
                    component: () => import("@/views/components/BDialog-demo.vue"),
                    meta: {
                        name: "BDialog-demo"
                    }
                },
                {
                    path: "/Bmessage-demo",
                    name: "Bmessage-demo",
                    component: () => import("@/views/components/Bmessage-demo.vue"),
                    meta: {
                        name: "Bmessage-demo"
                    }
                },
                {
                    path: "/DictSelect-demo",
                    name: "DictSelect-demo",
                    component: () => import("@/views/components/DictSelect-demo.vue"),
                    meta: {
                        name: "DictSelect-demo"
                    }
                },
                {
                    path: "/system/userManage",
                    name: "userManage",
                    component: () => import("@/views/system/userManage/index.vue"),
                    meta: {
                        name: "用户管理"
                    }
                },
                {
                    path: "/system/roleManage",
                    name: "roleManage",
                    component: () => import("@/views/system/roleManage/index.vue"),
                    meta: {
                        name: "角色管理"
                    }
                },
                {
                    path: "/system/authorityManage",
                    name: "authorityManage",
                    component: () => import("@/views/system/authorityManage/index.vue"),
                    meta: {
                        name: "权限管理"
                    }
                },
                {
                    path: "/system/organizationManage",
                    name: "organizationManage",
                    component: () =>
                        import("@/views/system/organizationManage/index.vue"),
                    meta: {
                        name: "机构管理"
                    }
                },
                {
                    path: "/modifyPassword",
                    name: "modifyPassword",
                    component: () => import("@/views/modifyPassword/index.vue"),
                    meta: {
                        name: "修改密码"
                    }
                },
                {
                    path: "/404",
                    name: "404",
                    component: () => import("@/views/exception/404.vue"),
                    meta: {
                        name: "404"
                    }
                }
            ]
        },
        {
            path: "*",
            component: () => import("@/components/Wrapper.vue"),
            children: [
                {
                    path: "*",
                    name: "404",
                    component: () => import("@/views/exception/404.vue"),
                    meta: {
                        name: "404"
                    }
                }
            ]
        }
    ]
});
