/*
 * @Author: xiaoyu.ren
 * @Date: 2019-06-14 17:15:20
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-26 11:25:58
 * @Description: 公共接口查询
 */

const state = {
  needTags: true
  /**
   * 以下是单个数据字典查询
   *  */
  //   cust_source: [], //用户来源
  //   loan_usages: [],//贷款用途
};

const mutations = {
  saveNeedTag(state, response) {
    state.needTags = response;
  }
};

const actions = {
  //是否开启多页签模式
  changeNeedTags({ commit }, params) {
    commit("saveNeedTag", params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
