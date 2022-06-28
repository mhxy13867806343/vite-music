import {ref,reactive} from 'vue'
export default function (){
    const searchValue = ref('')//搜索
    const placeholderValue = ref('请输入搜索关键词')//搜索默认关键字
    const searchDisabled=ref(false)//搜索按钮禁用
    const popLeftShow=ref(false)//弹窗显示
   const popPosition=ref('left')//弹窗位置
    const popDom=reactive({
        width:'80%',
        height:'120%',
    })
    const overlayStyle=ref({
        backgroundColor:'rgba(0,0,0,0.4)',
    })//自定义遮罩层样式
    const closeOnPopstate=ref(true)//是否在页面回退时自动关闭
    //用户相关
    const sendOpt=reactive({
        count: 60,
        timer: null,
        codeText: '获取验证码',
        isSend: false,
        counts:0//按钮是否点击大于1了
    })
    const userData=reactive({
        captcha:'',//验证码
        phone:'',//手机号码
        password:'',//密码
        countrycode:'86',//国家码
    })
    return {
        popDom,
        popLeftShow,
        popPosition,
        searchValue,
        placeholderValue,
        searchDisabled,
        overlayStyle,
        closeOnPopstate,
        sendOpt,userData
    }
}
