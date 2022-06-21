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
    return {
        popDom,
        popLeftShow,
        popPosition,
        searchValue,
        placeholderValue,
        searchDisabled,
        overlayStyle,
        closeOnPopstate
    }
}
