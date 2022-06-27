import axios from 'axios'
import router from '../router'
import { storeToRefs } from "pinia";
import { useTestStore } from "@/store";
const testStore = useTestStore();
import { Toast } from 'vant'
const {getCookie,clearLogin}=storeToRefs(testStore)
let reqList = []
/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */
const stopRepeatRequest = (reqList,url,cache,error)=>{
    const emsg = error ||''
    reqList.map(item=>{
        if(item===url){
            cache(emsg)
            return
        }
    })
    reqList.push(url)
}
/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
const allowRequest = function (reqList, url) {
    for (let i = 0; i < reqList.length; i++) {
        if (reqList[i] === url) {
            reqList.splice(i, 1)
            break
        }
    }
}
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_URL, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

service.defaults.headers.post['Content-Type'] = 'multipart/form-data'
service.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded'
// request拦截器 request interceptor

service.interceptors.request.use(
  config => {
      let c1=''
      config.cancelToken=new axios.CancelToken(c=>c1=c)
      if(config.cancelToken){
          stopRepeatRequest(reqList,config.url,c1,`${config.url}请求被中断`)
      }
    config.headers['set-cookie']= getCookie.value || ''
    return config
  },
  error => {
    Toast.clear()
    // do something with request error
      return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const {status,data,msg} = response
    if(status === 200){
        const {code,msg,message} = data
        if(code ===502 || code===509){
            Toast.fail(message||msg)
            return
        }
        const {code:code1}=data
          return Promise.resolve(data)
    }
  },
  error => {
    const data = error.response.data
    if(data.code===301){
      router.push('/m/login')
        clearLogin()
    } else  if(data.code===501){
      Toast.fail(data.message||data.msg)
      setTimeout(()=>{
        router.push('/m/reg')
      },1200)
    } else{
      Toast.fail(data.message||data.msg)
        setTimeout(()=>{
            allowRequest(reqList,error.config.url)
        },2000)
    }
    return Promise.reject(error.response)
  }
)

export default service
