import store from "@/store";
import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators';

@Module({dynamic: true, store, name: 'roleManage'})
class RoleManage extends VuexModule {
    public roleList: Array<object> = [];
    public allResourceList: Array<object> = [];  // 权限中可操作的菜单
    public loading = false;

    @Mutation
    private saveAllResourceList(payload) {
        this.allResourceList = payload
    }

    @Mutation
    private saveRoleList(payload) {
        this.roleList = payload
    }

    @Mutation
    private saveLoading(payload) {
        this.loading = payload
    }

    @Action({commit: 'saveAllResourceList'})
    public saveAllResourceListFN<T>(payload: T): T {
        return payload;
    }

    @Action({commit: 'saveRoleList'})
    public saveRoleListFN<T>(payload: T): T {
        return payload
    }

    @Action({commit: 'saveLoading'})
    public saveLoadingFN<T>(payload: T): T {
        return payload
    }
}

export const ROLEMANAGE = getModule(RoleManage);