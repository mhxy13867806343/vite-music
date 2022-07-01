
import {getHomeBanner as getHomeBanners,getHomepage as getHomepages,getPersonalizedNewsong as getPersonalizedNewsong1,
    getFirstMv as getFirstMv1
} from '@/api/index'
import {ref,onMounted} from "vue";
export default function () {
    //首页相关变量开始
    const bannerList = ref([])//首页bannerList
    const dragonList = ref([])//圆形图标入口列表
    const personalizedNewsong=ref([])//推荐新音乐
    const mvFirstList=ref([])//最新 mv
    //首页相关变量结束
    onMounted(async () => {
        await getHomeBanner({type: 2});
        await getPersonalizedNewsong({limit:12})
        await getFirstMv({limit:10})
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
    //推荐新音乐
    const getPersonalizedNewsong = async params => {
        getPersonalizedNewsong1(params).then(res => {
            const {code, category,result:pages} = res
            personalizedNewsong.value=pages
        })
    }
    //最新 mv
    const getFirstMv = async params => {
        getFirstMv1(params).then(res => {
            const {data} = res
            mvFirstList.value=data
        })
    }
    return {
        bannerList,
        personalizedNewsong,
        mvFirstList
    }
}
