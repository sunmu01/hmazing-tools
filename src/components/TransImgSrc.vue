<template>
	<layout>
		<div class="clearfix center p2">
			<p class="h1">Image Link Url Transformer</p>
			<div class="col-12 max-width-3 mx-auto">
				<input type="text" class="input center not-rounded" v-model="img">
				<p>转换结果：</p>
				<p>{{ link }}</p>
				<a class="btn btn-primary col-12 max-width-2 not-rounded" @click="copys(link)" v-if="link != ''">复制</a>
			</div>
		</div>
	</layout>
</template>

<script>
import Layout from './Layout'
export default {
	name: 'TransImgSrc',
	data () {
		return {
			img: ''
		}
	},
	computed: {
		link () {
			let self = this
			let pos = self.img.indexOf('?')
			if (pos > 0)
				return self.img.slice(0, pos)
			return self.img
		}
	},
	methods: {
		copys (link) {
			if (this.$clipboard(link)) {
				swal('复制成功', link, 'success')
			} else {
				swal('复制失败', '请刷新重试', 'error')
			}
		}
	},
	components: {
		Layout: Layout
	}
}
</script>

<style scoped>
</style>
