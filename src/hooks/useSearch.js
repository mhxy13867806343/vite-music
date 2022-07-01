import {getSearchHot222 as getSearchHot2,getSearchDefault as getSearchDefault1,getSearchHot as getSearchHot1,getCloudsearch as getCloudsearch1} from '@/api/search'
import {onMounted,ref} from'vue'
export default function (){
    const showdetailList=ref([])//热门搜索
    const historyList=ref([])//历史记录
    const searchHot=ref([])//热搜列表(简略)
    const getSearchDefault=async params=>{
        return new Promise((resolve,reject)=>{
            getSearchDefault1(params).then(res => {
                const {code, data} = res
                if(code===200){
                    resolve(data)
                }else{
                    reject(data)
                }
            })
        })

    }
    const getSearchHot=async params=>{
        getSearchHot1(params).then(res=>{
            const {code,data}=res
            if(code === 200){
                showdetailList.value = data
            }
        })
    }
    const getSearchHot21=async params=>{
        getSearchHot2(params).then(res=>{
            const {code,result:{hots}}=res
            if(code === 200){
                searchHot.value = hots
            }
        })
    }
    return {
        getSearchHot,
        showdetailList,
        historyList,
        getSearchDefault,
        getSearchHot21,
        searchHot

    }
}
