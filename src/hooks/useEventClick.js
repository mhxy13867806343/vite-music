import {useRoute,useRouter} from 'vue-router'
export default function (){
    const route = useRoute()
    const router = useRouter()
    //搜索相关内容
    const onSearchClick=(value)=>{

        // if(value){
        //     router.push({
        //         path:'/search',
        //         query:{
        //             s:value
        //         }
        //     })
        // }else{
        //     router.push({
        //         path:'/search',
        //     })
        // }

    }
    return {
        onSearchClick
    }
}
