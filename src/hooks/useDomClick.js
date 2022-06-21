import {ref, onMounted, reactive} from 'vue'
export default function (){
    const scrollHeight=ref(0)
    function documentQuerySelector(el='.van-nav-bar--fixed',height=44) {
        const navFixed=document.querySelector(el)
        scrollHeight.value=+navFixed.clientHeight||height
    }
    return {
        documentQuerySelector,
        scrollHeight
    }
}
