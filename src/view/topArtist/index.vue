<template>
	<div>
		<van-nav-bar
				left-text="歌手排行榜"
				left-arrow
				right-text="更多"
				@click-right="$router.push('/artistList')"
				fixed placeholder
				:z-index="100"
				@click-left="$router.back()"
		/>
		<van-tabs v-model:active="active" @change="onChange"
							:offset-top="offsetTop"
							sticky swipeable
							animated
		>
			<van-tab :title="a.title" v-for="(a,b) in activeType" :key="b">
				<div class="flex flex-wrap arrow-rightt">
					<van-loading size="24px" vertical v-if="isLoading">加载中...</van-loading>

					<van-skeleton title avatar :row="list.length" :loading="isLoading">
						<div v-for="(a,b) in list" :key="a.id"  class="flex-items text-center" @click.once="onClickButton(a)">
							<van-image :src="a.picUrl" fit="cover" round width="40" height="40">
								<template v-slot:loading>
									<van-loading type="spinner" size="20" />
								</template>
								<template v-slot:error>加载失败</template>
							</van-image>
							<div class="font-name">{{a.name}}</div>
						</div>
					</van-skeleton>

				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {getToplistArtist as getToplistArtist1} from '@/api/index'
const active=ref(0)//第几项
const isLoading=ref(false)//是否显示骨架屏，传 false 时会展示子组件内容
const offsetTop=ref(0)//粘性布局下吸顶时与顶部的距离，支持 px vw vh rem 单位，默认 px
const activeType=ref([
	{
		type:1,
		title:'华语',
		active:false,
	},
	{
		type:2,
		title:'欧美',
		active:false,
	},
	{
		type:3,
		title:'韩国',
		active:false,
	},
	{
		type:4,
		title:'日本',
		active:false,
	}

])//类型
const list=ref([])//数据
onMounted(()=>{
	getToplistArtist(1)
})
//请求歌手排行榜数据
const getToplistArtist=(type)=>{
	list.value=[]
	isLoading.value=true
	getToplistArtist1({type}).then(res=>{
		const {list:{artists}} = res
		list.value=artists
		if(list.value.length){
			isLoading.value=false
			const vanbar = document.querySelector('.van-nav-bar__placeholder')
			offsetTop.value=vanbar.clientHeight+'px'
		}
	})
}
//切换数据
const onChange=index=>{
	getToplistArtist(index+1)
}
//点击切换的逻辑
const onClickButton=item=>{
	console.log(item)
}
</script>

<style scoped lang="scss">
.arrow-rightt{

}
.flex-items{
	width: 25%;
}
</style>
