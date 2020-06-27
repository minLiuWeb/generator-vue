/*
 * @Author: min.liu
 * @Date: 2020-04-28 13:35:59
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-18 14:37:10
 * @Description:
 */
import axios from "axios";
import router from "../router";
import { Message } from "element-ui";
import { getStore } from "./utils";
const baseConfig = require("../../baseConfig");
import baseURL from "../api/api";
axios.interceptors.response.use(
  function(response) {
    if (response.status === baseConfig.successCode) {
      let responseData = response.data;
      if (responseData.code === baseConfig.loginFailureCode) {
        //1001登录失效
        router.replace({
          path: "/"
        });
      }
      if (responseData.code != 200) {
        (Message as any).closeAll();
        Message.error(responseData.msg);
      }
      return responseData;
    } else {
      (Message as any).closeAll();
      Message.error("系统错误");
      return {};
    }
  },
  err => {
    (Message as any).closeAll();
    if (err.response && err.response.status) {
      if (err.response.status == 404) {
        Message.error("服务器找不到了");
      } else if (err.response.status == 504) {
        Message.error("请求超时");
      } else if (err.response.status == 502) {
        Message.error("网关错误");
      } else if (err.response.status == 500) {
        Message.error("服务器异常");
      } else {
        Message.error("未知错误");
      }
    } else {
      Message.error("服务异常");
    }
    return Promise.resolve(err);
  }
);

class Axios {
  get(url: string, params: object, headers?: object) {
    return axios({
      url,
      method: "get",
      params,
      // baseURL,
      baseURL: baseURL.baseURL,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json;charset=UTF-8;",
        token: getStore("token") ? getStore("token") : ""
      }
    });
  }
  post(url: string, params: object, headers?: object) {
    console.log(baseURL,'baseURL')
    return axios({
      url,
      method: "POST",
      data: {
        params: params
      },
      baseURL: baseURL.baseURL,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json;charset=UTF-8;",
        token: getStore("token") ? getStore("token") : ""
      }
    });
  }
}

export default new Axios();
