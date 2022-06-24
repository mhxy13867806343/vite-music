
import {getHomeBanner as getHomeBanners,getHomepage as getHomepages} from '@/api/index'
import {ref,onMounted} from "vue";
export default function (){
    //首页相关变量开始
    const bannerList=ref([])//首页bannerList
    //首页相关变量结束
    onMounted(async ()=>{
       await getHomeBanner({type:2});
    })
    //首页banner列表
    const getHomeBanner=async params=>{
        const res=getHomeBanners(params)
        console.log(res,222)
    }
    return {
        bannerList
    }
}
