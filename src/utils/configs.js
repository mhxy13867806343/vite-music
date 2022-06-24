import {ref} from 'vue'
import storage from 'good-storage'

//弹窗导航
export const navTabList=ref([
    {
        title:'',
        children:[
            {
                title:'我的消息',
                icon:'notes-o',
                size:'50',
                path:'#'
            },
            {
                title:'最近播放',
                icon:'aim',
                size:'50',
                path:'#'
            },
        ]
    },
    {
        title:'',
        children:[
            {
                title:'关于',
                icon:'warning-o',
                size:'50',
                path:'#'
            },
        ]
    }
])

export const tabList=ref([//初始化tabList
    {
        active:'iconfont icon-faxian',
        inactive:'iconfont icon-faxian-copy',
        name:'发现',
        url:'/home',
    },
    {
        active:'iconfont icon-wode',
        inactive:'iconfont icon-wode-copy',
        name:'我的',
        url:'/me',
    },
    {
        active:'iconfont icon-guanzhu',
        inactive:'iconfont icon-guanzhu-copy',
        name:'关注',
        url:'/concern',
    },
    {
        active:'iconfont icon-yun_o',
        inactive:'iconfont icon-yun_o-copy',
        name:'云村',
        url:'/cloud',
    }
])

export function tcParams(){
    let cookie = ''
    if(storage.get('user')?.cookie){
        cookie =storage.get('user')?.cookie
    } else {
        cookie = ''
    }
    return {
        cookie,
        timestamp:Date.now()
    }
}
