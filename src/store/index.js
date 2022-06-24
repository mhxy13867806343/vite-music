import { defineStore } from 'pinia'
import {saveSearch,getSearch,delAllSearch,saveUser,getUser,clearAll} from '@/utils/data-cache'
export const useTestStore  = defineStore('main',{
    state:()=> {
        return {
            token: getUser('token')||'',//用户token
            cookie:getUser('cookie')||'',//用户cookie
            user: getUser('user'),//用户信息
            searchList: getSearch()||[]//搜索历史列表
        }
    },
    getters: {
        getToken: state => state.token,
        getCookie: state => state.cookie,
        getUser: state => state.user,
        getSearchList: state => state.searchList
    },
    actions:{
        //保存基本信息
        async onLogin({token,user,cookie}={token:'',user:{},cookie:''}) {
            this.user = user;
            this.token = token;
            this.cookie = cookie;
            saveUser('token',token)
            saveUser('user',user)
            saveUser('cookie',cookie)
        },
        //清空搜索记录
        clearSearchList(){
            this.searchList = [];
            delAllSearch()
        },
        //保存搜索记录
        saveSearchList(list){
            this.searchList = list;
            saveSearch(list)
        },
        //退出后清空
        clearLogin(){
            clearAll()
        }
    }
})