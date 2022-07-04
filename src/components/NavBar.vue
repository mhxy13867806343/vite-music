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
			<slot name="icon-right"></slot>
		</template>
	</van-nav-bar>
	<left-popup :show="popLeftShow" @click-overlay="popLeftShow=false">
		<template #pop>
			<div class="login-popup p-1.5	bgs-color">
				<div class="login-popup-wrapper flex items-center	pb-3 	">
					<van-image
										 class="image-content"
										 src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
					/>
					<div class="login-popup-wrapper-text font-black	pl-0.5	text-tiny">立即登录
					<span class="arrow-right align-middle"></span>
					</div>
				</div>
				<van-cell-group class="py-2.5	" v-for="(item,index) in navTabList" :key="index">
					<van-cell :title="a.title" is-link class="items-center"
					 v-for="(a,b) in item.children" :key="b">
						<template #icon>
							<van-icon :name="a.icon" :size="a.size"/>
						</template>
					</van-cell>
				</van-cell-group>
				<van-button type="danger" plain  hairline size="large">退出</van-button>
			</div>
		</template>
	</left-popup>
</div>
</template>

<script setup>
import {navTabList} from '@/utils/configs'
import LeftPopup from "./LeftPopup.vue";
import useVariable from "@/hooks/useVariable";
const {popLeftShow}=useVariable()
import useDomClick from "@/hooks/useDomClick";
const {documentQuerySelector,scrollHeight}=useDomClick()
import {ref, onMounted, reactive} from 'vue'
onMounted(()=>{
	documentQuerySelector()
})
const onClickNav=()=>{
	popLeftShow.value=true
}
</script>

<style scoped lang="scss">
.login-popup{}
::v-deep .van-cell__title{
	padding-left: 4px;
}
::v-deep .van-cell-group{
	background:transparent;
}
</style>
