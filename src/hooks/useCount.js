import {numberFormat} from '@/utils/filterNum'
export default function (){
    const getCountPlayCount=list=>{
        if(list.length){
            return list.map(item=>numberFormat(item.playCount))
        }
        return `0`
    }
    return {
        getCountPlayCount
    }
}
