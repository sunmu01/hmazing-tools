<template>
	<layout>
		<div class="clearfix center p2">
			<p class="h1">Google Map Position Transformer</p>
			<div class="col-12 max-width-2 mx-auto">
				<input type="text" class="input center not-rounded" v-model="position" placeholder="这里粘贴GoogleMap复制结果，如：39.803906, 116.512255">
				<a class="btn btn-primary col-12 max-width-2 not-rounded" @click="trans">转 换</a><br>
			</div>
			<div class="col-12 max-width-2 mx-auto" v-if="transed">
				<p class="bold">转换结果：{{ latlng }}</p>
				<p class="mb0">加上 origin@ 或 produce@ 才是 原产地 或 生产地 坐标</p>
				<p class="mt0">选择下面其中的一个复制，到 Shopify 去粘贴使用</p>
				<hr>
				<p class="bold">原产地坐标：</p>
				<input type="text" class="input center not-rounded" v-model="origin">
				<a class="btn btn-primary col-12 max-width-2 not-rounded" @click="copys('原产地', origin)">复制 原产地 坐标</a>
				<hr>
				<p class="bold">生产地坐标：</p>
				<input type="text" class="input center not-rounded" v-model="produce">
				<a class="btn btn-primary col-12 max-width-2 not-rounded" @click="copys('生产地', produce)">复制 生产地 坐标</a>
				<br><br>
			</div>
		</div>
	</layout>
</template>

<script>
import Layout from './Layout'
export default {
	name: 'TransLocation',
	data () {
		return {
			position: '39.803906, 116.512255',
			latlng: '',
			origin: '',
			produce: '',
			transed: false,
			copied: false
		}
	},
	methods: {
		trans () {
			let self = this
			let locations = self.position.split(', ')
			if (typeof locations[0] !== 'boolean' && !isNaN(locations[0]) && locations[0] !== ''
				&& typeof locations[1] !== 'boolean' && !isNaN(locations[1]) && locations[1] !== '') {
				let lat = locations[0] < 0 ? 'S' + Math.abs(locations[0]) : 'N' + locations[0]
				let lng = locations[1] < 0 ? 'W' + Math.abs(locations[1]) : 'E' + locations[1]
				self.latlng = lat + ';' + lng
				self.origin = 'origin@' + self.latlng
				self.produce = 'produce@' + self.latlng
				self.transed = true
			} else {
				swal('您输入的坐标信息有错', '请检查您的输入是否正确', 'error')
			}
		},
		copys (alt, loc) {
			if (this.$clipboard(loc)) {
				swal(alt + '坐标已复制成功', loc, 'success')
			} else {
				swal(alt + '坐标复制失败', '请刷新重试', 'error')
			}
		}
	},
	components: {
		Layout: Layout
	}
}
</script>

<style scoped>
hr {
	border: 3px solid #eee;
}
</style>
