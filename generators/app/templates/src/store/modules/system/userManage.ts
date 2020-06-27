import store from "@/store";
import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators';

@Module({dynamic: true, store, name: 'userManage'})
class UserManage extends VuexModule {
    public list: Array<object> = [];
    public saveSearchData:object = {};
    public loading: boolean = false

    /******************Mutation*********************/
// 每个Mutation对应一个方法【每一个方法都是一个独立的Mutation】
    @Mutation
    private saveList(data) {
        this.list = data
    }

    @Mutation
    private saveLoading(payload) {
        this.loading = payload
    }

    @Mutation
    private saveSearch(data) {
        this.saveSearchData = data;
    }
    /******************Mutation*********************/
    /******************Action*********************/
// 每个Action对应一个方法【每一个方法都是一个独立的Action】
    // 方式一
    @Action({commit: 'saveList'})
    public queryList<T>(data: T): T {
        return data
    }

    // 方式二
    // @Action
    //    public queryList(data) {
    //     // 这里可以写别的逻辑等等
    //        this.saveList(data)
    //    }

    @Action({commit: 'saveLoading'})
    public listLoading<T>(payload: T): T {
        return payload
    }

    @Action({commit:'saveSearch'})
    public saveSearchFN<T>(data:T):T {
        return data;
    }

    /******************Action*********************/
}

// 将UserManage赋值为USERMANAGE导出，方便在vue组件中调用,调用的时候调用的是USERMANGE
export const USERMANAGE = getModule(UserManage);