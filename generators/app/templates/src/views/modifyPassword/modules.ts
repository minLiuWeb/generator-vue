import { replacePassword } from "@/api/loginAPI";
const state = {};
const mutations = {};
const actions = {
  queryModify({ commit }, params) {
    return replacePassword(params);
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
