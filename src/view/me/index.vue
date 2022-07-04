<template>
	<NavBar class="icon-title-search">
		<template #icon-right>
			<van-icon name="search" size="50" @click="onSearchClick('')" />
		</template>
	</NavBar>
	<div class="p-1.5">
		<div class="detail-avater">

		</div>
		<div class="detail-nav"></div>
		<div class="detail-options">
			<div class="song-options-list">
				<van-cell :title="`我的歌单(${15}个)`" value="创建歌单" />
				<van-cell title="收藏数据" value="查看" is-link />
				<van-cell title="等级信息" :value="`LV${9}`" is-link />
				<van-cell title="绑定信息" value="查看" is-link />
				<van-cell title="绑定手机" :value="`绑定${18072783978}`" is-link />
				<van-cell title="修改用户信息" value="更新用户信息" is-link />
				<van-cell title="查看歌单列表" value="歌单列表" is-link />
			</div>
		</div>
	</div>
</template>

<script setup>
import useEventClick from "@/hooks/useEventClick";
const {onSearchClick}=useEventClick()
import useVariable from '@/hooks/useVariable'
import {onMounted} from "vue";
const {searchValue,placeholderValue,searchDisabled}=useVariable()
import useSearch from "@/hooks/useSearch";
const {getSearchDefault}=useSearch()
onMounted(async ()=>{
	placeholderValue.value = await getSearchDefault()
})
</script>

<style scoped>

</style>
