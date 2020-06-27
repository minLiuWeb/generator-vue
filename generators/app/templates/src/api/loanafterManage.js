/*
 * @Author: xiaoyu.ren
 * @Date: 2020-03-29 18:43:28
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-18 14:41:07
 * @Description: 贷后管理API
 */

import axios from "@/utils/axios";

//获取批量调额列表
export const getBatchAdjustmentsList = params => {
  return axios.post(`/batchAmt/list`, params);
};
