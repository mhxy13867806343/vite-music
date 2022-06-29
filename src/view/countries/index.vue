<template>
	<van-nav-bar
			left-text="选择国家码"
			left-arrow
			fixed placeholder
			class="action-placeholder"
			@click-left="$router.go(-1)"
	/>
	<div class="index-bar-wrapper">
		<div class="index-anchor-wrapper relative page-content" ref='content'

		>
			<div class="index-header-26" ref="navs">{{toggleAnchorText}}</div>
			<ul class="index-anchor-wrapper-ul" ref='items'>
				<li v-for="(item,index) in countrycodeList" :key="index"
				:ref="el=>setItemRef(el,item.label)"
						:data-href="item.label"
						:data-cls="`cls`+index"
						:class="['cls'+index,{'select-right-index-anchor':selectRightAnchorIndex===index}]"
				>
					<div class="index-anchor-label">{{item.label}}</div>
					<van-cell v-for="(a1,b1) in item.countryList" :key="b1"
										@click="$router.push(`/login?code=${a1.code}`)"
										:title="a1.zh"
					></van-cell>
				</li>
			</ul>
			<ul class="right-top">
				<li class="right-li text-center" v-for="(item,index) in countrycodeListCom" :key="index"
				:data-label="item"
						:class="{'select-right-index-anchor':selectRightAnchorIndex===index}"
						@click="onChangeIndex(index)"
						@touchmove.prevent="handleTouchMove"
						@touchstart="handleTouchStart"

				>
					<span>{{item}}</span>
				</li>
			</ul>
			<div :class="{'active-prevOffset':prevOffset}">{{toggleAnchorText}}</div>
		</div>
	</div>
</template>

<script setup>
import {useRouter,useRoute} from 'vue-router'
import {getCountries} from '@/api/index'
import {computed,onMounted,ref,watch,watchEffect,nextTick,onUnmounted} from "vue";
const countrycodeList=ref([])//国家码
const selectRightAnchorIndex=ref(-1)//跳右边对应的页面
const selectLeftAnchorIndex=ref(-1)//跳左边对应的页面
const toggleAnchorText=ref('')//改变被选择中的文字
const indexBarPosX=ref(0)//改变被选择中的文字
const prevOffset=ref(-999)//改变被选择中的文字
const iframeRefs=ref({})//滚动的内容
const route=useRoute()
import { useTestStore } from "@/store";
import { storeToRefs } from "pinia";
const testStore = useTestStore();
const {getCountrycode}=storeToRefs(testStore)
onMounted( ()=>{
	if(!getCountrycode.value.length){
		getCountriesList()
	}else{
		countrycodeList.value=getCountrycode.value
	}
//	window.addEventListener("scroll", onScroll);
})
//页面卸载
onUnmounted(() => {
	//window.removeEventListener("scroll", onScroll);
});
watchEffect(async ()=>{
})

const countrycodeListCom=computed(()=>{
	let list =[]
	countrycodeList.value.map((item,index)=>{

		list.push(item.label)
	})
	return list
})
//国家编码列表
const getCountriesList=()=>{
	getCountries().then(res=>{
		const {code,data}=res
		if(code===200){
			countrycodeList.value=data
			testStore.saveCountrycode(countrycodeList.value)
		}
	}).catch(e=>{
	})
}
//点击索引栏的字符时触发
const onChangeIndex=(index)=>{
	const pos=document.querySelector(`.cls${index}`)
	selectRightAnchorIndex.value=index
	selectLeftAnchorIndex.value=index
	toggleAnchorText.value=countrycodeListCom.value[index]
	window.scrollTo({
		top: pos.offsetTop,
		behavior: "smooth",
	});
}
//当前高亮的索引字符变化时触发
const onSelectIndex=(index)=>{
	const pos=document.querySelector(`.cls${index}`)
	let pisIndex=0
	console.log(pos)
}
const setItemRef = (el, key) => {
	if (el) {
		iframeRefs.value[key] = el
		el.style.height =`${el.offsetHeight}px`
	}
}
const handleTouchStart=e=>{
	indexBarPosX.value = e.touches[0].clientX;
}
const handleTouchMove=e=>{
	const x = indexBarPosX.value;
	const y = e.touches[0].clientY;
	const target = document.elementFromPoint(x, y);
	const top = target && target.dataset && target.dataset.label;

	const keys=iframeRefs.value[top]
	if(keys){
		const at =keys.dataset.cls.split('').at(-1)
		prevOffset.value=at
		selectRightAnchorIndex.value=at
		selectLeftAnchorIndex.value=at
		window.scrollTo({
			top: prevOffset.value,
			behavior: "smooth",
		});
	}
}
</script>

<style scoped lang="scss">
.index-bar-wrapper{
	padding:6px
}
.select-right-index-anchor{
	color: #ee0a24;
}
.page-content{
	-webkit-overflow-scrolling: touch
}
.active-prevOffset{
	transform: scale(1.5);
	position: fixed;
	right: 16%;
	top: 50%;
	z-index: 12;
}
</style>
