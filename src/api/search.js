import request from '@/utils/request'
//默认搜索关键词
export const getSearchDefault = params =>request({
    url:'/search/default',
    params
})
