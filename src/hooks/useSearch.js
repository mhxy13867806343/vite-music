import {getSearchDefault as getSearchDefault1} from '@/api/search'
import {onMounted} from'vue'
export default function (){
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
    return {
        getSearchDefault,

    }
}
