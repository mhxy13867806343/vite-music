<template>
	<van-nav-bar
			left-text="歌手详情"
			left-arrow
			right-text="搜索"
			@click-right="$router.push('/search')"
			fixed placeholder
			:z-index="100"
			@click-left="$router.back()"
	/>
</template>

<script setup>
</script>

<style scoped>

</style>
