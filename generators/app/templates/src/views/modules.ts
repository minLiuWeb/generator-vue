//登录
import login from "./Login/modules";
//公共部分
import common from "./common/modules";
//工作台
import home from "./Home/modules";
//修改密码
import modifyPassword from "./modifyPassword/modules";
//系统管理-用户管理
// import userManage from "./system/userManage/modules";
//系统管理-角色管理
// import roleManage from "./system/roleManage/modules";
//系统管理-权限管理
import authorityManage from "./system/authorityManage/modules";
//系统管理-机构管理
import organizationManage from "./system/organizationManage/modules";
//贷后管理-批量调额
import batchAdjustment from "./loanafterManage/batchAdjustment/modules";
//客户管理
import custManage from "./custManage/modules";
export default {
  login,
  common,
  home,
  modifyPassword,
  // userManage,
  // roleManage,
  authorityManage,
  organizationManage,
  batchAdjustment,
  custManage
};
