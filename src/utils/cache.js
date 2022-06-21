import storage from 'good-storage'

const SEARCH_KEY = '__search__'

const MAX_SEARCH_LEN = 20


const TOKEN = 'token' //用户的token
const USERID = 'user' //用户id
const Cookies = 'Cookies' //用户cookie
function insertArr (arr, item, compare, maxLen) {
    const index=arr.findIndex(compare)
    if(index===0){  //数据为数组中的第一个数据 不做任何操作
        return
    }
    if(index>0){  //数组中有这条数据并且不再第一个位置
        arr.splice(index,1)  //删掉这个数
    }
    arr.unshift(item);//把这条数据存储到数组中的第一个位置上
    if(maxLen && arr.length>maxLen){
        //如果有条数限制并且数组的个数大于限制数
        arr.pop() //方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值

    }
}

function removeArr (arr, compare) {
    let index = arr.findIndex(compare)
    if (index !== -1) {
        arr.splice(index, 1)
    }
}
function _saveList (key, val, compare, len) {
    let history = storage.get(key, [])
    insertArr(history, val, compare, len)
    storage.set(key, history)
    return history
}
function _deleteList (key, compare) {
    let history = storage.get(key, [])
    removeArr(history, compare)
    storage.set(key, history)
    return history
}

/** **********搜索历史************/

export function saveSearch (query) {
    let searches=storage.get(SEARCH_KEY,[])
    /*逻辑是最后一次搜索的结果放到搜索历史的第一个*/
    insertArr(searches,query,(item)=>{
        return score(item,query) //这是传入的一个比较函数 说明query在这个数组中
    },MAX_SEARCH_LEN)
    storage.set(SEARCH_KEY,searches)
    return searches
}
//获取历史记录
export function getSearch () {
    return storage.get(SEARCH_KEY, [])
}
//比较2个是否有相同的存在
function score(item,query){
    return item.score === query.score
}
//删除某一项记录
export function delSearchItem (query) {
    return _deleteList(SEARCH_KEY, item => {
      return score(item,query)
    })
}
//清空所有
export function delAllSearch () {
    storage.remove(SEARCH_KEY)
    return []
}

export function saveUser(key,data){
    storage.set(key,data)
    return data
}
export function getUser(key){
    return storage.get(key, '')
}
export function delUser(key){
    storage.remove(key)
    return ''

}
//清空所有
export default function clearAll(){
    delUser('token')
    delUser('user')
    delUser('cookie')
    delAllSearch()
}
