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
</template>

<script setup>
import useVariable from '@/hooks/useVariable'
const {searchValue,placeholderValue,searchDisabled}=useVariable()
import {useRoute} from 'vue-router'
import {onMounted} from 'vue'
const route=useRoute()
onMounted(()=>{
	if(route.query.search){
		placeholderValue.value=route.query.search
	}

})
//搜索
const onClickButton=(vale)=>{
	console.log(vale)
}
</script>

<style scoped lang="scss">
::v-deep .van-ellipsis{
	min-width:90%
}
</style>
