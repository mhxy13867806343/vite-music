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
				<div class="text-2xl font-extrabold">推荐歌单</div>
				<div class="text-base">更多 <span class="icon-cross"></span></div>
			</div>
		</div>

	</main>
</template>

<script setup>
import useVariable from '@/hooks/useVariable'
const {searchValue,placeholderValue,searchDisabled}=useVariable()
import useEventClick from "@/hooks/useEventClick";
const {onSearchClick}=useEventClick()
import useHomeReQue from "@/hooks/useHomeReQue";
const {bannerList}=useHomeReQue()
</script>

<style scoped lang="scss">
.icon-title-search{
}
</style>
