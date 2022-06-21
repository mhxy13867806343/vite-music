<template>
	<NavBar class="icon-title-search">
		<template #icon-title>
			<van-search v-model="searchValue"

									@click-input="onSearchClick"
									:placeholder="placeholderValue"  :disabled="searchDisabled"/>
		</template>
	</NavBar>
	<div>
	<div v-for="(i) in 200" :key="i">
		{{i}}
	</div>
</div>
</template>

<script setup>
import useVariable from '@/hooks/useVariable'
const {searchValue,placeholderValue,searchDisabled}=useVariable()
import useEventClick from "@/hooks/useEventClick";
const {onSearchClick}=useEventClick()
</script>

<style scoped lang="scss">
.icon-title-search{
}
</style>
