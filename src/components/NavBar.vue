<template>
<div>
	<van-nav-bar fixed placeholder :style="{height: scrollHeight+'px'}">
		<template #left>
			<van-icon name="wap-nav"  @click="onClickNav"/>
		</template>
		<template #title>
			<slot name="icon-title"></slot>
		</template>
		<template #right>
			<van-icon name="icon-right" size="18" />
		</template>
	</van-nav-bar>
	<left-popup :show="popLeftShow" @click-overlay="popLeftShow=false">
		<template #pop>
			<div class="login-popup">
				<div class="login-popup-wrapper">
					<van-image round
										 class="image-content"
										 fit="contain"
										 src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
					/>
					<div class="login-popup-wrapper-text">立即登录></div>
				</div>
			</div>
		</template>
	</left-popup>
</div>
</template>

<script setup>
import LeftPopup from "./LeftPopup.vue";
import useVariable from "@/hooks/useVariable";
const {popLeftShow}=useVariable()
import {ref,onMounted} from 'vue'
const scrollHeight=ref(0)
onMounted(()=>{
	const navFixed=document.querySelector('.van-nav-bar--fixed')
	scrollHeight.value=+navFixed.clientHeight||44
})
const onClickNav=()=>{
	popLeftShow.value=true
	console.log(popLeftShow.value)
}
</script>

<style scoped lang="scss">
.login-popup{}
</style>
