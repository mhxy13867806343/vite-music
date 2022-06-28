<template>
	<van-nav-bar
			left-text="手机号登录"
			left-arrow
			fixed placeholder
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
				<div class="text-base" @click="countrycodeShow=true">
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
	<van-popup
			v-model:show="countrycodeShow"
			closeable round
			:lazy-render="false"
			:style="{ height: '100%',width:'100%' }"
	>
		<van-overlay :show="isSkeleton" @click="isSkeleton = false" />
		<van-skeleton title avatar :row="countrycodeList.length" :loading="isSkeleton">
			<van-index-bar :index-list="countrycodeList"
			>
				<van-index-anchor
						:index="item.label"
													v-for="(item,index) in countrycodeList" :key="index"
				>{{item.label}}
					<div v-for="(a1,b1) in item.countryList" :key="b1">
						<van-cell
								:title="a1.zh"
						></van-cell>
					</div>

				</van-index-anchor>

			</van-index-bar>
		</van-skeleton>


	</van-popup>
</div>
</template>

<script setup>
import {ref,onMounted,computed} from 'vue'
import useVariable from '@/hooks/useVariable'
const {sendOpt,userData}=useVariable()
import {clikPhone} from '@/utils/variable'
import { Toast } from 'vant';
import {getCountries} from '@/api/index'
import useEventClick from "@/hooks/useEventClick";
const {sendBtn60}=useEventClick()
const countrycodeList=ref([])//国家码
const countrycodeShow=ref(false)//国家码展示列表
const isSkeleton=ref(false)//数据是否存在
onMounted(()=>{
	getCountriesList()
})
const countrycodeListCom=computed(()=>{

})
//国家编码列表
const getCountriesList=()=>{
	isSkeleton.value=true
	getCountries().then(res=>{
		const {code,data}=res
		if(code===200){
			countrycodeList.value=data
			console.log(countrycodeList.value,222)
			if(countrycodeList.value.length){
				isSkeleton.value=false
			}
		}
	}).catch(e=>{

	})
}
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
