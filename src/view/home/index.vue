<template>
	<NavBar class="icon-title-search">
		<template #icon-title>
			<van-search v-model="searchValue"

									@click-input="onSearchClick"
									:placeholder="placeholderValue"  :disabled="searchDisabled"/>
		</template>
	</NavBar>
	<van-swipe class="my-swipe m-2		" lazy-render
						 :duration="1200"
						 :autoplay="6000" indicator-color="white">
		<van-swipe-item
		 v-for="(item,index) in 5" :key="index"
		>

			<div class="relative">
				<img class="swiper-images"
						 src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
				/>
				<div class="type-container absolute bottom-0 right-0 bg-red-700	 text-white	w-2.5 text-3xl text-center	z-0	">
					{{item+1}}
				</div>
			</div>
		</van-swipe-item>
	</van-swipe>
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
