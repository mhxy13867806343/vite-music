<template>
	<div class="container" :style="{paddingBottom:(scrollHeight+10)+'px'}">
		<router-view/>
	</div>
	<van-tabbar v-model="active" @change="tabChange" >
		<van-tabbar-item v-for="(item,index) in tabList" :key="index">
			<span>{{item?.name}}</span>
			<template v-slot:icon="icon">
				<div :class="icon.active ? item.active : item.inactive" />
			</template>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()
const scrollHeight=ref(0)
const active=ref(0) //初始化active为0
const tabList=ref([//初始化tabList
	{
		active:'iconfont icon-faxian',
		inactive:'iconfont icon-faxian-copy',
		name:'发现',
		url:'/home',
	},
	{
		active:'iconfont icon-wode',
		inactive:'iconfont icon-wode-copy',
		name:'我的',
		url:'/me',
	},
	{
		active:'iconfont icon-guanzhu',
		inactive:'iconfont icon-guanzhu-copy',
		name:'关注',
		url:'/concern',
	},
	{
		active:'iconfont icon-yun_o',
		inactive:'iconfont icon-yun_o-copy',
		name:'云村',
		url:'/cloud',
	}
])
onMounted(()=>{
	const tabbarFixed=document.querySelector('.van-tabbar--fixed')
	scrollHeight.value=+tabbarFixed.clientHeight||50
	const list=tabList.value
	list.map((item,index)=>{
		item.index=index
	})
	const index=list.findIndex(item=>item.url===route.path)
	active.value=index ||0
})
//监听路由变化
const tabChange=index=>{
	router.push({
		path:tabList.value[index].url
	})
}
</script>

<style scoped lang="scss">

</style>
