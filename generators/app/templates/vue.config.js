/*
 * @Author: min.liu
 * @Date: 2020-04-28 13:36:01
 * @LastEditors: min.liu
 * @LastEditTime: 2020-05-08 18:02:32
 * @Description:vue.config.js
 */

const baseConfig = require("./baseConfig");
var path = require('path')
// const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  outputDir: baseConfig.packageName,
  filenameHashing: true, //文件哈希
  devServer: {
    open: true,
    port: baseConfig.port,
    proxy: {
      "/api": {
        target: baseConfig.targetUrl, //服务器地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  // webpack配置
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
    // config.plugins = [
    //   new FileManagerPlugin({ 
    //     onEnd: {
    //       delete: [   //首先需要删除项目根目录下的dist.zip
    //         `./${baseConfig.packageName}.zip`,   
    //       ],
    //       archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
    //         {source: `./${baseConfig.packageName}`, destination: `./${baseConfig.packageName}.zip`},   
    //       ]
    //     }
    //   })
    // ]
  }
};
