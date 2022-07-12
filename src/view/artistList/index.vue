<template>
	<van-nav-bar
			left-text="歌手列表"
			left-arrow
			right-text="搜索"
			@click-right="$router.push('/search')"
			fixed placeholder
			:z-index="100"
			@click-left="$router.back()"
	/>
	<van-sticky :offset-top="scrollHeight">
		<div class="p-1.5">
			<van-row>
				<van-col span="3" class="font-black	">按分类</van-col>
				<van-col span="21">
					<div>
				<span v-for="(a,b) in typeList" :key="b"
							class="p-0.5"
							:class="{'db-color':typeActive===b}"
							@click.stop="onClickType(b)"
				>
					{{a.title}}
				</span>
					</div>
				</van-col>
			</van-row>
			<van-row class="py-1.5">
				<van-col span="3" class="font-black	">按地区</van-col>
				<van-col span="21">
					<div>
				<span v-for="(a,b) in areaList" :key="b"
							class="p-0.5"
							:class="{'db-color':areaActive===b}"
							@click.stop="onClickArea(b)"
				>
					{{a.title}}
				</span>
					</div>
				</van-col>
			</van-row>
			<van-row class="py-1.5">
				<van-col span="3" class="font-black	 font-black-flex items-center">按字母</van-col>
				<van-col span="21">
					<div class="flex flex-wrap ">
				<span v-for="(a,b) in initialList" :key="b"
							class="pl-0.5"
							@click.stop="onClickInitial(b)"
							:class="{'db-color':initialActive===b}"
				>
					{{a}}
				</span>
					</div>
				</van-col>
			</van-row>
		</div>
	</van-sticky>

	<van-list
			v-model:loading="isLoading"
			:finished="isFinished"
			finished-text="没有更多了"
			:immediate-check="false"
			@load="onArtilsLoad"
	>
		<ul class="flex flex-wrap arrow-rightt">
			<li v-for="(item,index) in list" :key="index"  class="flex-items text-center flex items-center"
			@click="$router.push(`/singerDetails?id=${item.id}`)"

			>
				<div class="flex items-center">
					<van-image :src="item.picUrl" fit="cover" round width="200" height="200">
						<template v-slot:loading>
							<van-loading type="spinner" size="20" />
						</template>
						<template v-slot:error>加载失败</template>
					</van-image>
					<div class="font-name">{{item.name}}</div>
				</div>
				<div class="flex-1	 text-right">
					<i @click.stop="onToggle(item)" class="iconfont" :class="[!item.followed?'icon-guanzhu':'icon-guanzhu-copy']"></i>
				</div>
			</li>
		</ul>
	</van-list>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {getArtistList} from '@/api/index'
//分类
const typeList=ref([
	{
		type:-1,
		title:'全部',
		acitve:0
	},
	{
		type:1,
		title:'男歌手',
		acitve:-1
	},
	{
		type:2,
		title:'女歌手',
		acitve:-1
	},
	{
		type:3,
		title:'乐队',
		acitve:-1
	}
])
//地区
const areaList=ref([
	{
		type:-1,
		title:'全部',
		acitve:0
	},
	{
		type:7,
		title:'华语',
		acitve:-1
	},
	{
		type:96,
		title:'欧美',
		acitve:-1
	},
	{
		type:8,
		title:'日本',
		acitve:-1
	},
	{
		type:16,
		title:'韩国',
		acitve:-1
	},
	{
		type:0,
		title:'其他',
		acitve:-1
	}
])
//更新分类字段
const initialList=ref([])//生成26字母
const typeActive=ref(0)//分类的索引
const areaActive=ref(0)//地区的索引
const initialActive=ref('')//字母的索引
const offsetIndex=ref(0)//第几页
const isMore=ref(false)//是否有更多
const isLoading=ref(false)//是否正在加载
const isFinished=ref(false)//是否加载完成
const list=ref([])//列表数据
import useEventClick from "@/hooks/useEventClick";
const {onToggle}=useEventClick()
import useDomClick from "@/hooks/useDomClick";
const {documentQuerySelector,scrollHeight}=useDomClick()
onMounted(()=>{
	getLetter()
	getArtistList1()
})
//编写生成26个字母方法
const getLetter=()=>{
	let str=''
	for(let i=0;i<26;i++){
		str+=String.fromCharCode(97+i)+','
	}
	initialList.value=str.substring(0,str.length-1).split(',')
}
//歌手分类列表
const getArtistList1= ()=>{
	offsetIndex.value++
	const params={limit:30,offset:offsetIndex.value,type:typeActive.value,area:areaList.value[areaActive.value].type,initial:initialList.value[initialActive.value]}
	isLoading.value=true
	getArtistList(params).then(res=>{
		const {artists,more,code}=res
		if(code===200){
			if(!more||!artists.length){
				isFinished.value=true
			}else{
				list.value=[...list.value,...artists]
				if(list.value.length){

						documentQuerySelector('.van-nav-bar__placeholder')
				}
			}
			isLoading.value=false

		}else{

		}
	}).catch(err=>{
		isMore.value=false
		isLoading.value=false
		isFinished.value=false
	})
}
const onClearllist=()=>{
	list.value=[]
	isMore.value=false
	isLoading.value=false
	isFinished.value=false
	offsetIndex.value=0
	getArtistList1()
}
//按地区
const onClickArea=index=>onClickValue(areaActive,index)

//按分类
const onClickType=index=>onClickValue(typeActive,index)

//按字母
const onClickInitial=index=>onClickValue(initialActive,index)

//分类切换逻辑
const onClickValue=(type,index=0)=>{
	if(type.value===index){
		return
	}
	type.value=index
	onClearllist()
}
//加载数据
const onArtilsLoad=()=>{
	getArtistList1()
}
</script>

<style scoped lang="scss">
.initialList{
	right:20px;
	width: 30px;
	li{
		padding: 2px;
		text-align: center;
	}
}
.show-initialList{
	right:80px;
	top:50%;
	transform: scale(4);
	background: red;
	color: #fff;
	border-radius: 100%;
	width: 4%;
	text-align: center;
}
.font-black-flex{
	display: flex;
}
.db-color{
	color: red;
}
.flex-items{
	width: 100%;
	margin-bottom: 18px;
	padding:0 20px;
}
::v-deep .van-sticky--fixed{
	background-color: #fff;
}
</style>
