import request from '@/utils/request'
//首页banner列表
export const getHomeBanner = params =>request({
    url:'/banner',
    params
})
//首页-发现-圆形图标入口列表
export const getHomepage = params =>request({
    url:'/homepage/dragon/ball',
    params
})
//推荐歌单
export const getPersonalized = params =>request({
    url:'/personalized',
    params
})

//国家编码列表
export const getCountries = params =>request({
    url:'/countries/code/list',
    params
})

//推荐新音乐
export const getPersonalizedNewsong = params =>request({
    url:'/personalized/newsong',
    params
})
//最新 mv
export const getFirstMv= params =>request({
    url:'/mv/first',
    params
})

//歌手榜
export const getToplistArtist= params =>request({
    url:'/toplist/artist',
    params
})
