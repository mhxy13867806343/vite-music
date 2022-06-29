<template>
	<div class="active">
		<van-nav-bar
				left-text="选择国家码"
				left-arrow
				fixed placeholder
				class="action-placeholder"
				@click-left="$router.go(-1)"
		/>
		<van-index-bar :index-list="countrycodeListCom"
									 @change="onChangeIndex"
									 @select="onSelectIndex"
		>
			<template 					v-for="(item,index) in countrycodeList" :key="index">
				<van-index-anchor
						:index="item.label"
				>{{item.label}}
					<van-cell v-for="(a1,b1) in item.countryList" :key="b1"
										:title="a1.zh"
										@click="$router.push(`/login?code=${a1.code}`)"
					></van-cell>

				</van-index-anchor>

			</template>

		</van-index-bar>

	</div>
	<div class="van-cell-content">{{scrollTo}}</div>
</template>

<script setup>
import {useRouter,useRoute} from 'vue-router'
import {getCountries} from '@/api/index'
import {computed,onMounted,ref,watch,watchEffect,nextTick} from "vue";
const countrycodeList=ref([])//国家码
const scrollTo=ref(null)//国家码
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

})
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
			countrycodeList.value.map((item,index)=>item.id=index)
			testStore.saveCountrycode(countrycodeList.value)
		}
	}).catch(e=>{
	})
}
//点击索引栏的字符时触发
const onChangeIndex=(index)=>{
	scrollTo.value=index
	setTimeout(()=>{
		scrollTo.value=''
	},2000)
}
//当前高亮的索引字符变化时触发
const onSelectIndex=(index)=>{
console.log(index)
}
</script>

<style scoped lang="scss">
.van-cell-content{
	position: fixed;
	top: 50%;
	right: 40px;
	transform: scale(1.5);
	z-index: 11;
}
</style>
