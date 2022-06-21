<template>
	<van-popup round v-model:show="show"
						 transition-appear
						 safe-area-inset-top afe-area-inset-bottom
						 :close-on-popstate="closeOnPopstate"
						 @click-overlay="$emit('click-overlay')"
						 :overlay-style="overlayStyle"
						 :position="popPosition" :style="{ width:popDom.width,height:popDom.height }">

		<slot name="pop">
		</slot>
	</van-popup>

</template>

<script setup>
import useVariable from "@/hooks/useVariable";
const {popPosition,popDom,overlayStyle,closeOnPopstate}=useVariable()
defineProps({
	show:{
		type:Boolean,
		default:false
	}
})
</script>

<style scoped>

</style>
