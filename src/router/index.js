import {createRouter,createWebHashHistory} from 'vue-router';
import Tabber from '../components/Tabber.vue';
const routes = [
    {path:'/',component:Tabber,
        redirect: to => {
            // 方法接收目标路由作为参数
            // return 重定向的字符串路径/路径对象
            return { path: '/home'}
        },
    children:[
        {
            path:'/home',
        component:()=>import("../view/home/index.vue")
        },
        {path:'/search',component:()=>import("../view/vserach/index.vue")},

        {path:'/concern',component:()=>import("../view/concern/index.vue")},
        {path:'/cloud',component:()=>import("../view/cloud/index.vue")},
        {path:'/me',component:()=>import("../view/me/index.vue")},
    ]
    },
    {path:'/login',component:()=>import("../view/login/index.vue")},
    {path:'/cpwd',component:()=>import("../view/changePassword/index.vue")},
    {path:'/countries',component:()=>import("../view/countries/index.vue")},
];

const router = createRouter({
    history:createWebHashHistory('/'),
    routes
});

export default router;
