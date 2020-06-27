/*
 * @Author: xiaoyu.ren
 * @Date: 2019-02-01 10:07:22
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-24 14:05:32
 * @Description:
 */
import * as api from "@/api/systemManage";
import { renderOrganization } from "@/config/mUtils";
const state = {
  orgList: [],
  loading: false
};

const mutations = {
  saveList(state, response) {
    state.orgList = response;
  },
  saveLoading(state, response) {
    state.loading = response;
  }
};

const actions = {
  //获取机构列表
  queryOrgList({ commit }, params) {
    commit("saveLoading", true);
    api.allOrganization(params).then(res => {
      commit("saveList", renderOrganization(res.data));
      commit("saveLoading", false);
    });
  },
  //新增/编辑机构
  queryAddOrg({ commit }, params) {
    return api.addOrganization(params);
  },
  //删除机构
  queryDeleteOrg({ commit }, params) {
    return api.deleteOrganization(params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
