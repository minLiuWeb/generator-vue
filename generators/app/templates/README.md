本文档主要记录需要讨论的问题

权限拦截 1. 前端如何做资源拦截，即用户通过地址栏访问菜单，如果不在权限内如果处理
全局 loading 1. 讨论全局 loading 如何做

跨域代理

    1.讨论是否加进去。个人建议加进去

打包 1. 增加版本号，清除服务器缓存 2. 增加打包文件夹名称修改 3. 增加打包文件自动生成压缩包，默认.zip 4. 清空打包文件夹内容再打包

全局变量配置
讨论全局变量是否有必填提出到公用配置页面 1. 成功响应码 2. 接口请求超时时间 3. logo 地址 4. 公司名称 5. 浏览器图标地址 6. 浏览器 title 7. 登录失效码值 8. 技术支持

menu 菜单处理、角色授权(提取公用方法，建议后端返回格式固定)

<!--
 * @Author: min.liu
 * @Date: 2020-04-28 13:36:00
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-12 10:34:37
 * @Description:
 -->

# 百融云创-平台创新部前端基础框架

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 2020-04-28

```
增加基础配置，参考根目录下的baseConfig.js;
--打包时包名称可从baseConfig定义,默认basicProject,打包后自动生成Zip包;
--将请求响应码值、登录失效码值提取公共变量;
```
