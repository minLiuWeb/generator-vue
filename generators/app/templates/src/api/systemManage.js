/*
 * @Author: xiaoyu.ren
 * @Date: 2020-03-29 18:43:28
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-18 14:42:18
 * @Description: 系统管理API
 */

import axios from "@/utils/axios";

//获取用户列表
export const getUserList = params => {
  // return axios.post(`/user/listbypage`, params);
  return axios.get("../../../json/user.json", params);
};
//获取角色列表
export const RoleQueryList = params => {
  // return axios.post(`/role/list`, params)
  return axios.get("../../../json/roleList.json", params);
};
//编辑/新增角色
export const addAndUpdateRole = params => {
  return axios.post(`/role/addAndUpdateRole`, params);
};
//授权角色
export const AuthorityRole = params => {
  return axios.post(`/role/addAndUpdate`, params);
};
//删除角色
export const DeleteRole = params => {
  return axios.post(`/role/delete`, params);
};
//根据角色获取可操作的菜单
export const roleMenu = params => {
  // return axios.get(`/role/roleOfResource`, params);
  return axios.get("../../../json/roleOfResource.json", params);
};
//用户管理-新增
export const UserAdd = params => {
  return axios.post(`/user/add`, params);
};
//用户管理-编辑
export const UserUpdate = params => {
  return axios.post(`/user/update`, params);
};
//用户管理-重置密码
export const UserResetPwd = params => {
  return axios.post(`/user/reset`, params);
};
//用户管理-删除用户
export const deleteUser = params => {
  return axios.post(`/user/delete`, params);
};
//机构管理-删除机构
export const deleteOrganization = params => {
  return axios.post(`/organization/delete`, params);
};
//机构管理-列表
export const allOrganization = params => {
  // return axios.post(`/organization/list`, params)
  return axios.get("../../../json/orgList.json", params);
};
//机构管理-新增/更新机构
export const addOrganization = params => {
  return axios.post(`/organization/addAndUpdate`, params);
};
//权限管理列表
export const authorityList = params => {
  // return axios.post(`/sys/permissionManage/list`, params);
  return axios.get("../../../json/allResource.json", params);
};
//权限管理父节点列表
export const authorityFatherList = params => {
  return axios.post(`/sys/permissionManage/list2`, params);
};
//权限管理-新增
export const authorityAdd = params => {
  return axios.post(`/sys/permissionManage/insert`, params);
};
//权限管理-编辑
export const authorityUpdate = params => {
  return axios.post(`/sys/permissionManage/update`, params);
};
//权限管理-删除
export const authorityDelete = params => {
  return axios.post(`/sys/permissionManage/delete`, params);
};
