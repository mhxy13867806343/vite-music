<template>
	<div>1</div>
<!--	<van-cell-group title="艺人百科">-->
<!--		<van-cell>-->
<!--			<template #title>-->
<!--				<van-image :src="data?.user?.avatarDetail?.identityIconUrl"-->
<!--				 width="70"-->
<!--									 height="70" round-->
<!--				></van-image>{{data?.user?.description}}-->
<!--			</template>-->
<!--		</van-cell>-->
<!--		<van-cell title="艺人名:" :value="data?.user?.nickname"  />-->
<!--		<van-cell title="身份:" :value="artistCom"  />-->
<!--	</van-cell-group>-->
</template>

<script setup>
import {computed} from 'vue'
const  props = defineProps({
	data:{
		type:Object,
		default:()=>{
			return {}
		}
	}
})
const artistCom=computed(()=>{
	const artist=props.data?.artist
	let transNames=artist.transNames
	let identities=artist.identities
	let identifyTag=artist.identifyTag
	let str =''
	if(transNames.length){
		str+=`${transNames.join('/')}`
	} if(identities.length){
		str+=`${identities.join('/')}`
	} if(identifyTag.length){
		str+=`${identifyTag.join('/')}`
	}
	return str
})
</script>

<style scoped lang="scss">

</style>
