<template>
	<van-nav-bar
			left-text="手机号登录"
			left-arrow
			fixed placeholder
			:z-index="11111111"
			@click-left="$router.back()"
	/>
<div class="mt-11">
	<van-cell-group inset>
		<van-field
				v-model="userData.phone"
				center
				clearable
				label="手机号码"
				maxlength="11"
				type="number"
				placeholder="请输入手机号码"
		>
			<template #left-icon>
				<div class="text-base" @click="$router.push(`/countries?code=${userData.countrycode}`)">
					+{{userData.countrycode}}
					<i class="iconfont icon-xiangxiajiantoushixin"></i>
				</div>
			</template>
			<template #button>
				<van-button size="small" type="primary"
				:disabled="sendOpt.isSend"
										@click="onSend"
				>{{sendOpt.codeText}}</van-button>
			</template>
		</van-field>
		<van-field v-model="userData.captcha" label="验证码"
							 center
							 clearable
							 maxlength="6"
							 placeholder="请输入6位手机验证码"
		/>
	</van-cell-group>
	<div  class="my-10">
		<van-button
				@click="onClickSendLogin"
				round block type="primary" native-type="submit">
			登录
		</van-button>
	</div>
</div>
</template>

<script setup>
import {useRouter,useRoute} from 'vue-router'
import {ref,onMounted,computed} from 'vue'
import useVariable from '@/hooks/useVariable'
const {sendOpt,userData}=useVariable()
import {clikPhone} from '@/utils/variable'
import { Toast } from 'vant';
import useEventClick from "@/hooks/useEventClick";
const {sendBtn60}=useEventClick()
const route=useRoute()
onMounted(()=>{
	if(route.query.code){
		userData.countrycode=route.query.code
	}
})


const onClickSend=()=>{
	if(!userData.phone.length){
		Toast({
			message: '手机号码不能为空',
			position: 'top',
		});
		return false
	} if(!clikPhone(userData.phone)){
		Toast({
			message: '手机号码不合法',
			position: 'top',
		});
		return false
	}
	return true
}
//发送验证码
const onSend=()=>{
	if(onClickSend()){
		sendBtn60(sendOpt)
	}
}
//登录
const onClickSendLogin=()=>{
	if(onClickSend()){
		if(!sendOpt.counts){
			Toast({
				message: '还没有发送过验证码呢',
				position: 'top',
			});
			return false
		}
		if(!userData.captcha.length){
			Toast({
				message: '请输入6位验证码',
				position: 'top',
			});
			return false
		} if(userData.captcha.length &&userData.captcha.length<6){
			Toast({
				message: '验证码不能小于6位',
				position: 'top',
			});
			return false
		}

	}
}
</script>

<style scoped lang="scss">

</style>
