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
	<div class="p-1.5">
		<van-row>
			<van-col span="3" class="font-black	">按分类</van-col>
			<van-col span="21">
				<div>
				<span v-for="(a,b) in typeList" :key="b"
							class="p-0.5"
							:class="{'db-color':typeActive===b}"
							@click="onClickType(b)"
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
							@click="onClickArea(b)"
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
							@click="onClickInitial(b)"
							:class="{'db-color':initialActive===b}"
				>
					{{a}}
				</span>
				</div>
			</van-col>
		</van-row>
	</div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
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
const swipeChangeText=ref('')//滑动的字段
//生成26字母
const initialList=ref([])
const typeActive=ref(0)//分类的索引
const areaActive=ref(0)//地区的索引
const initialActive=ref(-1)//字母的索引

onMounted(()=>{
	getLetter()
})
//编写生成26个字母方法
const getLetter=()=>{
	let str=''
	for(let i=0;i<26;i++){
		str+=String.fromCharCode(97+i)+','
	}
	initialList.value=str.substring(0,str.length-1).split(',')
}
//按地区
const onClickArea=index=>{
	areaActive.value=index===areaActive.value?-1:index
}
//按分类
const onClickType=index=>{
	typeActive.value=index===typeActive.value?-1:index
}
//按字母
const onClickInitial=index=>{
	initialActive.value=index===initialActive.value?-1:index
}
//编写滑动方法
const onSwipeTop=(item, i)=>{
	return function (direction, mouseEvent) {
		swipeChangeText.value=item
		console.log("Swiped item ", i, ": ", item, " in direction ", direction,mouseEvent);
	};
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
</style>
