/*
 * @Author: min.liu
 * @Date: 2020-04-28 15:25:47
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-26 10:50:46
 * @Description: 基础配置
 */
module.exports = {

    successCode: 200, //成功响应码值
    loginFailureCode: 1001, // 登录失效码值
    siteTitle: '<%= systemName %>',//网站title
    browserTitle: '<%= browserName %>', //浏览器title
    packageName: '<%= projectName %>', //打包后文件夹名称
    port: 8008, // 启动应用时的端口号
    targetUrl: "http://192.168.162.126:8083", // 后端服务地址
    pageSize: 10, //页码配置
    logoUrl: "/images/logo.png", // logo路径
  
};

