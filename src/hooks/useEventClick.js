import {useRoute,useRouter} from 'vue-router'
export default function (){
    const route = useRoute()
    const router = useRouter()
    //搜索相关内容
    const onSearchClick=(value)=>{

        if(value){
            router.push({
                path:'/search',
                query:{
                    search:value
                }
            })
        }else{
            router.push({
                path:'/search',
            })
        }

    }
    //倒计时
    const isNum9 = (n) => (n < 10 ? `0${n}s后重新发送` : `${n}s后重新发送`) //倒计时60s
    const sendBtn60 = (opt) => {
        const sendOpt=opt||{}
        if (sendOpt.count> -1) {
            sendOpt.timer = setInterval(() => {
                sendOpt.count -= 1
                sendOpt.codeText = `${isNum9(sendOpt.count, 's后重新发送')}`
                sendOpt.isSend = true
                sendOpt.counts=1
                if (sendOpt.count <= 0) {
                    sendOpt.count = 60
                    sendOpt.codeText = '验证码'
                    sendOpt.isSend = false
                    clearInterval(sendOpt.timer)
                }
            }, 1000)
        }
    }
    return {
        sendBtn60,
        onSearchClick
    }
}
