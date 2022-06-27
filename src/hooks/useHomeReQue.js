
import {getHomeBanner as getHomeBanners,getHomepage as getHomepages} from '@/api/index'
import {ref,onMounted} from "vue";
export default function () {
    //首页相关变量开始
    const bannerList = ref([])//首页bannerList
    const dragonList = ref([])//圆形图标入口列表
    //首页相关变量结束
    onMounted(async () => {
        await getHomeBanner({type: 2});
    })
    //首页banner列表
    const getHomeBanner = async params => {
        getHomeBanners(params).then(res => {
            const {code, banners} = res
            bannerList.value = banners
        })
    }
    //圆形图标入口列表
    const getHomePage = async params => {
        getHomepages(params).then(res => {
            const {code, pages} = res
            dragonList.value=pages
        })
    }
    return {
        bannerList
    }
}
