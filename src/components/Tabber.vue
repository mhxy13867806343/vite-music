<template>
	<div class="container" :style="{paddingBottom:(scrollHeight+10)+'px'}">
		<keep-alive>
			<router-view :key="$route.fullPath" v-if="$route.meta.isDataAlive"/>
		</keep-alive>
		<router-view :key="$route.fullPath" v-if="!$route.meta.isDataAlive"/>
	</div>
	<van-tabbar v-model="active" @change="tabChange" >
		<van-tabbar-item v-for="(item,index) in tabList" :key="index">
			<span>{{item?.name}}</span>
			<template v-slot:icon="icon">
				<div class="text-lg" :class="icon.active ? item.active : item.inactive" />
			</template>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script setup>
import {tabList} from '@/utils/configs'
import {ref,onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()
import useDomClick from "@/hooks/useDomClick";
const {documentQuerySelector,scrollHeight}=useDomClick()
const active=ref(0) //初始化active为0
onMounted(()=>{
	documentQuerySelector('.van-tabbar--fixed',50)
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
