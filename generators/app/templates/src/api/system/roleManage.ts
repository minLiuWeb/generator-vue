/*
 * @Author: xiaoyu.ren
 * @Date: 2020-05-11 14:56:31
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-18 14:40:41
 * @Description: 角色管理API
 */

import axios from "@/utils/axios";

//获取角色列表
export const ROLEQUERYLIST = params => {
  // return axios.post(`/role/list`, params)
  return axios.get("../../../json/roleList.json", params);
};

//删除角色
export const DELETEROLE = params => {
  return axios.post(`/role/delete`, params);
};

//根据角色获取可操作的菜单
export const ROLEMENU = params => {
  // return axios.get(`/role/roleOfResource`, params);
  return axios.get("../../../json/roleOfResource.json", params);
};

//权限管理列表
export const AUTHORITYLIST = params => {
  // return axios.post(`/sys/permissionManage/list`, params);
  return axios.get("../../../json/allResource.json", params);
};

//编辑/新增角色
export const ADDANDUPDATEROLE = params => {
  return axios.post(`/role/addAndUpdateRole`, params);
};

//授权角色
export const AUTHORITYROLE = params => {
  return axios.post(`/role/addAndUpdate`, params);
};
