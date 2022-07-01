<template>
	<NavBar class="icon-title-search">
		<template #icon-title>
			<van-search v-model="searchValue"

									@click-input="onSearchClick"
									:placeholder="placeholderValue"  :disabled="searchDisabled"/>
		</template>
	</NavBar>
	<div v-if="bannerList.length">
		<van-swipe class="my-swipe m-2		" lazy-render
							 :duration="1200"
							 :autoplay="6000" indicator-color="white">
			<van-swipe-item
					v-for="(item,index) in bannerList" :key="index"
			>

				<div class="relative">
					<img class="swiper-images"
							 :src="item.pic"
					/>
					<div
							:style="{backgroundColor:item.titleColor}"
							class="type-container absolute bottom-0.5 right-0.5  text-white	 text-center	z-0
						p-0.5

">
						{{item.typeTitle}}
					</div>
				</div>
			</van-swipe-item>
		</van-swipe>
	</div>


	<nav></nav>
	<main>
		<div class="cell-group cell-group-just p-1.5">
			<div class="flex items-center justify-between	">
				<div class="text-2xl font-extrabold">推荐新音乐</div>
			</div>
			<ul class="gnewsong">
				<li class="news-item divide-y" v-for="(item,index) in personalizedNewsong" :key="index">
					<div class="flex justify-between	 items-center	">
						<div class="">
							<div class="name-center">
								<span class="font-title">{{item.name}}</span> <span class="font-sub" v-if="item&&item.song&&item.song&&item.song.alias&&item.song.alias[0]">({{item&&item.song&&item.song&&item.song.alias&&item.song.alias[0]}})</span>
							</div>
							<div class="artists-item">
								<span class="font-artists" v-for="(artist,index) in item&&item.song&&item.song&&item.song.alias&&item.song.artists" :key="index">{{artist.name}}</span>
							</div>
						</div>
						<div>
							<i class="iconfont icon-bofang"></i>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="cell-group cell-group-just p-1.5">
			<div class="flex items-center justify-between	">
				<div class="text-2xl font-extrabold">最新 mv</div>
			</div>
			<ul class="gnewsong flex a-scroll">
				<li class="mvFirstList text-center" v-for="(item,index) in mvFirstList" :key="index">
					<div class="name-center-mv">
						<div class="relative mv-center">
							<img :src="item.cover"  class="new-cover">
							<span class="absolute	item-playCount">{{playCount[index].value+playCount[index].unit}}</span>
						</div>
						<span class="font-name">{{item.name}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="cell-group cell-group-just p-1.5">
			<div class="flex items-center justify-between	">
				<div class="text-2xl font-extrabold">推荐歌单</div>
				<div class="text-base">更多 <span class="icon-cross"></span></div>
			</div>
		</div>

	</main>
</template>

<script setup>
import {numberFormat} from '@/utils/filterNum'
import {computed} from 'vue'
import useVariable from '@/hooks/useVariable'
const {searchValue,placeholderValue,searchDisabled}=useVariable()
import useEventClick from "@/hooks/useEventClick";
const {onSearchClick}=useEventClick()
import useHomeReQue from "@/hooks/useHomeReQue";
const {bannerList,personalizedNewsong,mvFirstList}=useHomeReQue()
const playCount=computed(()=>{
	if(mvFirstList.value.length){
		return mvFirstList.value.map(item=>numberFormat(item.playCount))
	}
	return `0`
})
</script>

<style scoped lang="scss">
.icon-title-search{
}
</style>
