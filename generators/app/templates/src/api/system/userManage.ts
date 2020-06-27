/*
 * @Author: xiaoyu.ren
 * @Date: 2020-05-11 14:56:31
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-18 14:41:24
 * @Description: 用户管理API
 */

import axios from "@/utils/axios";

//获取用户列表
export const GETUSERLIST = params => {
  // return axios.post(`/user/listbypage`, params);
  return axios.get("../../../json/user.json", params);
};

//获取角色列表
export const ROLEQUERYLIST = params => {
  // return axios.post(`/role/list`, params)
  return axios.get("../../../json/roleList.json", params);
};

//机构管理-列表
export const ALLORGANIZATION = params => {
  // return axios.post(`/organization/list`, params)
  return axios.get("../../../json/orgList.json", params);
};

//用户管理-删除用户
export const DELETEUSER = params => {
  return axios.post(`/user/delete`, params);
};

//用户管理-重置密码
export const USERRESETPWD = params => {
  return axios.post(`/user/reset`, params);
};

//用户管理-新增
export const USERADD = params => {
  return axios.post(`/user/add`, params);
};
//用户管理-编辑
export const USERUPDATE = params => {
  return axios.post(`/user/update`, params);
};
