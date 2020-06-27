/*
 * @Author: xiaoyu.ren
 * @Date: 2019-02-27 19:47:20
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-24 18:08:17
 * @Description:
 */
import * as api from "@/api/systemManage";
import { renderAuthority } from "@/config/mUtils";
const state = {
  authorityListArry: [], //所有资源(未处理过的)
  allResourceList: [], //所有资源(菜单)
  checkDicUseType: [], //使用类型
  checkDicType: [], //权限类型
  loading: false
};

const mutations = {
  saveDicUseTypeList(state, response) {
    state.checkDicUseType = response;
  },
  saveDicTypeList(state, response) {
    state.checkDicType = response;
  },
  saveList(state, response) {
    state.allResourceList = response;
  },
  saveAuthorityListArry(state, response) {
    state.authorityListArry = response;
  },
  saveLoading(state, response) {
    state.loading = response;
  }
};

const actions = {
  //获取权限列表
  queryAllResource({ commit }, params) {
    commit("saveLoading", true);
    api.authorityList(params).then(res => {
      commit("saveList", renderAuthority(res.data));
      commit("saveLoading", false);
    });
  },
  //权限新增-编辑 父节点列表
  queryFatherList({ commit }, params) {
    api.authorityList(params).then(res => {
      commit("saveAuthorityListArry", res.data);
    });
  },
  //权限-新增
  queryAddAuthority({ commit }, params) {
    return api.authorityAdd(params);
  },
  //权限-编辑
  queryUpdateAuthority({ commit }, params) {
    return api.authorityUpdate(params);
  },
  //权限-删除
  queryDeleteAuthority({ commit }, params) {
    return api.authorityDelete(params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
