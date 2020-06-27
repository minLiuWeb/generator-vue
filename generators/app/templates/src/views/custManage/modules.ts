/*
 * @Author: xiaoyu.ren
 * @Date: 2020-03-21 10:36:21
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-21 10:39:09
 * @Description: 客户管理module
 */
import * as api from "@/api/custManage";

const state = {
  list: [], //客户管理列表
  searchData: {
    //客户管理查询搜索条件
    pageNum: 1,
    pageSize: 10
  },
  loading: false
};

const mutations = {
  saveList(state, response) {
    state.list = response;
  },
  saveSearchData(state, response) {
    state.searchData = response;
  },
  saveLoading(state, response) {
    state.loading = response;
  }
};

const actions = {
  //客户管理查询
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api.getList(params).then(res => {
      commit("saveList", res.data);
      commit("saveLoading", false);
    });
  },
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
