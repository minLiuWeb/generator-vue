/*
 * @Author: xiaoyu.ren
 * @Date: 2019-02-01 12:00:30
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-24 14:04:52
 * @Description:
 */
import * as api from "@/api/systemManage";
import { renderResouce } from "@/config/mUtils";
const state = {
  roleList: [],
  allResourceList: [], //权限中可操作的菜单
  loading: false
};

const mutations = {
  saveList(state, response) {
    state.roleList = response;
  },
  saveAllResourceList(state, response) {
    state.allResourceList = response;
  },
  saveLoading(state, response) {
    state.loading = response;
  }
};

const actions = {
  queryRoleList({ commit }, params) {
    commit("saveLoading", true);
    api.RoleQueryList(params).then(res => {
      commit("saveList", res.data);
      commit("saveLoading", false);
    });
  },
  //根据角色获取权限树
  queryResourceTreeList({ commit }, params) {
    api.authorityList(params).then(res => {
      commit("saveAllResourceList", renderResouce(res.data));
    });
  },
  //获取全部
  queryAllResource({ commit }, params) {
    return api.roleMenu(params);
  },
  //授权角色
  queryAuthorityRole({ commit }, params) {
    return api.AuthorityRole(params);
  },
  //编辑/新增角色
  queryAddAndUpdateRole({ commit }, params) {
    return api.addAndUpdateRole(params);
  },
  //删除角色
  queryDeleteRole({ commit }, params) {
    return api.DeleteRole(params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
