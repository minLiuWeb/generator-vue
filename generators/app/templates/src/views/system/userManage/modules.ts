/*
 * @Author: xiaoyu.ren
 * @Date: 2019-01-31 16:41:14
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-24 13:49:51
 * @Description:
 */
import * as api from "@/api/systemManage";

const state = {
  list: [],
  searchData: {
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
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api.getUserList(params).then(res => {
      commit("saveList", res.data);
      commit("saveLoading", false);
    });
  },
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },
  //重置密码
  queryResetPwd({ commit }, params) {
    return api.UserResetPwd(params);
  },
  //删除用户
  queryDeleteUser({ commit }, params) {
    return api.deleteUser(params);
  },
  //新增用户
  queryAddUser({ commit }, params) {
    return api.UserAdd(params);
  },
  //编辑用户
  queryUpdateUser({ commit }, params) {
    return api.UserUpdate(params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
