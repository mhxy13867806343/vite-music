<template>
	<div class="iconfont absolute icon-a-zuojiantouzhixiangzuojiantou icon-left-icon"></div>
	<div class="iconfont absolute icon-diandian icon-left-icon" @click="showPopover=true"
	v-if=" userData?.descValue?.briefDesc"
	>
		<van-popover v-model:show="showPopover" :actions="actionsPopoverList"
								 placement="bottom-end"
								 @select="onItemSelect"
		>
			<template #reference>
			</template>
		</van-popover>
	</div>

	<div class="details relative">
		<div class="backgroundUrl" :style="{backgroundImage:`url(${userData?.user?.backgroundUrl})`}"></div>
		<div class="p-1 text-center bg-shox">
			<van-image :src="userData?.user?.backgroundUrl"
			width="200" fit="cover" round
								 height="200"
								 class="backgroundUrl-avater absolute"
			>
				<template v-slot:loading>
					<van-loading type="spinner" size="20" />
				</template>
				<template v-slot:error>加载失败</template>
			</van-image>
			<h2 class="text-base text-base-img">
				{{userData?.user?.nickname}}
			</h2>
			<p class="pt-0.5 text-gray-400		text-base">{{userData?.user?.description}}</p>
			<div class="flex-1 pt-0.5" v-if="userData?.user">
				<i  class="iconfont text-gray-400	text-base" :class="[!userData?.user?.followed?'icon-guanzhu':'icon-guanzhu-copy']"

				>
					{{userData?.user?.followed?'已关注':'关注'}}
				</i>
			</div>
		</div>
	</div>
	<van-tabs v-model:active="active" @change="onDyPageParamsChange"
						sticky swipeable
						animated
	>
		<van-tab :title="a.title" v-for="(a,b) in singerTabList" :key="b">
			<component :is="typeComponentMap[active]"/>
		</van-tab>
	</van-tabs>
	<van-popup round closeable	 v-model:show="introductionPopupShow"  :style="{ width:'90%' }">
		<ul v-if="userData?.descValue?.introduction?.length">
			<li class="text-center" v-for="(a,b) in userData?.descValue?.introduction" :key="b">
				<div class="pb-1">
					<div class="text-gray-400	text-base p-0.5">{{a.ti}}</div>
					<div class="text-gray-400	text-base p-0.5">{{a.txt}}</div>
				</div>
			</li>
		</ul>
	</van-popup>
	<van-popup round closeable	 v-model:show="secondaryExpertIdentiyShow"  :style="{ width:'90%' }">
		<van-cell-group v-if="userData?.secondaryExpertIdentiy?.length"
										:title="`歌手<${userData?.user?.nickname}>专家标识信息`"
		>
			<van-cell :title="a.expertIdentiyName" :value="`${a.expertIdentiyCount>0?a.expertIdentiyCount+'个':'未获取得专家标识'}`"
								v-for="(a,b) in userData?.secondaryExpertIdentiy" :key="b"
			/>
		</van-cell-group>
	</van-popup>

</template>

<script setup>
import home from './homecom/index.vue'
import album from './album/index.vue'
import mv from './mv/index.vue'
import singer from './singer/index.vue'
import songsaleboard from './songsaleboard/index.vue'
import { Dialog } from 'vant';
import {getArtistDesc,getArtistDetail,getArtists}from '@/api'
import {ref, onMounted, reactive} from 'vue'
import {useRouter,useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()
const userData = ref({})
const showPopover = ref(false)//是否显示下拉菜单
const introductionPopupShow = ref(false)//成就弹窗
const secondaryExpertIdentiyShow = ref(false)//专家标识弹窗
const actionsPopoverList = ref([//下拉菜单列表
	{ text: '歌手简介',index:1 },
	{ text: '歌手成就',index:2 },
	{ text: '专家标识',index:3 },
])
//动态组件类型
const active=ref(0)
const typeComponentMap = {
	0: home,
	1: songsaleboard,
	2: album,
	3: mv,
	4: singer,
}
//歌手详情页面tab切换
const singerTabList=ref([
	{
		title:'主页',
		active:0,
	},
	{
		title:'单曲',
		active:1,
	},{
	 title:'专辑',active:2,
	},{
		title:'MV',active:3,
	},{
		title:'歌手',active:4,
	}
])
onMounted(()=>{
	//获取歌手详情
	const id = route.query.id
	getArtistDetail({id}).then(res=>{
		userData.value=res.data
		getArtistDesc({id}).then(res=>{
			userData.value.descValue=res
		})
		getArtists({id}).then(res=>{
		})
	})

})
const onDyPageParamsChange=index=>active.value=index
//点击选项时触发
const onItemSelect=item=>{
	const index= item.index
	if(index===1){
		Dialog.alert({
			message: userData.value.descValue.briefDesc,
		}).then(() => {
			// on close
		});
	}else if(index===2){
		introductionPopupShow.value=true
	}else if(index===3){
		secondaryExpertIdentiyShow.value=true
	}
}
</script>

<style scoped lang="scss">
.backgroundUrl{
	background-size: 100% 100%;
	background-origin: unset;
	background-repeat: no-repeat;
	padding-bottom: 100%;
}
.icon-left-icon{
	z-index: 11;
	padding: 12px;
	&:nth-child(1){
		left:0
	}
	right: 0;
}
.bg-shox{
	//阴影
	box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
	border-radius: 10px;
	width:90%;
	margin:0 auto;
	position: relative;
	top: -100px;
	background-color: #fff;
	padding-bottom: 10%;
}
.backgroundUrl-avater{
	top:-30px;
	transform: translate(-50%,0);
}
.text-base-img{
	padding-top: 30px;
}
</style>
