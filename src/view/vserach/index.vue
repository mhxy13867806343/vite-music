<template>
	<van-nav-bar
			left-arrow
			fixed placeholder
			:z-index="100"
			@click-left="$router.push('/home')"
	>
		<template #title>
			<van-search v-model="searchValue"
									:show-action="!!placeholderValue.length"
									action-text="搜索"
									:placeholder="placeholderValue"
			@search="onClickButton"
									@click-right-icon="onClickButton(searchValue)"
			>
			</van-search>
		</template>

	</van-nav-bar>
	<div class="default padding-15-10">
		<div class="hot">
			<h3>热门搜索</h3>
			<transition-group name="list" tag="ul" class="flex flex-wrap	 flex-wraps">
				<li v-for="(k,v) in showdetailListCom" :key="k.score"  class="flex-wrap flex-33 hot-padding"
						@click="onShowdetai(k)"
				>
          <span class="index"
								:style="{'color':v<3?'red':''}"
					>
            {{v+1}}
          </span><span  :style="{'font-weight':v<3?'bold':''}">{{k.searchWord}}</span>
				</li>
			</transition-group>
			<div class="hot-more" @click="onMore"
					 v-if="showdetailListCom.length<11"
			>展开更多热搜</div>
		</div>
		<div class="histroy" v-if="historyList.length">
			<div class="flex flex-between flex-items">
				<h3>历史搜索</h3>
				<span @click="onRemoveAll"><van-icon name="delete" class="icon" /></span>
			</div>
			<ul>
				<li v-for="(k,v) in historyList" :key="k.score" class="flex flex-between flex-items"
				>
					<span @click="onShowdetai(k)">{{k.searchWord}}</span>
					<span  @click="onRemoveDel(k,v)"><van-icon name="cross" class="icon" /></span>
				</li>
			</ul>
		</div>
		<div class="">
			<h3>热搜列表</h3>
		<ul>
			<li v-for="(k,v) in searchHot" :key="v" class="flex flex-between flex-items"
			>
				<span>{{k.first}}</span>
			</li>
		</ul>
		</div>
	</div>
</template>

<script setup>
import useVariable from '@/hooks/useVariable'
const {searchValue,placeholderValue,searchDisabled}=useVariable()
import {useRoute} from 'vue-router'
import {onMounted,ref,computed} from 'vue'
import useSearch from "@/hooks/useSearch";
const isMoreData = ref(true) //查看更多
const {getSearchDefault,  getSearchHot,
	showdetailList, getSearchHot21,
	searchHot,
	historyList,}=useSearch()
const route=useRoute()
import { storeToRefs } from "pinia";
import { useTestStore } from "@/store";
const testStore = useTestStore();
onMounted(()=>{
	if(route.query.search){
		placeholderValue.value=route.query.search
	}
	getSearchHot21()
	getSearchHot()

})
let showdetailListCom = computed({
	get(){
		if(isMoreData.value){
			if(showdetailList.value.length<10){
				return  showdetailList.value
			}
			let tempArr = []
			for(let i=0;i<10;i++){
				let item =showdetailList.value[i]
				tempArr.push(item)
			}
			return tempArr
		}
		return  showdetailList.value
	},
	set(val){
		showdetailListCom = val
	}
})
const onMore = ()=>{
	//查看更多
	isMoreData.value = !isMoreData.value
}
//搜索
const onClickButton=(vale)=>{
	console.log(vale)
}
//点某那一项展示
const onShowdetai = item =>{
	testStore.saveSearchList(item)
	searchValue.value = item.searchWord
	historyList.value.push(item)
}
</script>

<style scoped lang="scss">
::v-deep .van-ellipsis{
	min-width:90%
}
.padding-15-10{
	padding:10px 15px
}
.default{
	li{
		padding-bottom:10px;
		white-space:nowrap
	}
	.hot-padding{
		margin-bottom:10px
	}
	.index{
		padding-right:10px
	}
}
.hot-more{
	color:#999;
	text-align:center;
	position:relative;
	&:after{
		position:absolute;
		content:'';
		width: 0px;
		height: 0px;
		border-top: 5px solid rgba(0,0,0,.2);
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		bottom:5px;
	}
}
.list-enter-active,
.list-leave-active {
	transition: all 2s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateY(-100%);
}
.search-top{
	h3{
		font-size: 15px;
		color: #507daf;
	}
	h3,li{
		height:40px;
		line-height:40px;
	}
	li{
		white-space:nowrap;
		span{
			font-size:15px;
			padding-left:14px;
		}
	}
}
</style>
