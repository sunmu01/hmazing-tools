<template>
	<layout>
		<div class="clearfix center p2">
			<p class="h1">Refeed Vespa Feeds</p>
			<div class="col col-12 border-box p1 center">
				<a class="btn btn-primary btn-big bg-gray col-12 max-width-1" v-if="pendding == 'category'">Categories Refeeding...</a>
				<a class="btn btn-primary btn-big bg-yellow col-12 max-width-1" v-else @click="refeed('category')">1. Refeed Categories</a>
			</div>
			<div class="col col-12 border-box p1 center">
				<a class="btn btn-primary btn-big bg-gray col-12 max-width-1" v-if="pendding == 'collection'">Collections Refeeding...</a>
				<a class="btn btn-primary btn-big bg-teal col-12 max-width-1" v-else @click="refeed('collection')">2. Refeed Collections</a>
			</div>
			<div class="col col-12 border-box p1 center">
				<a class="btn btn-primary btn-big bg-gray col-12 max-width-1" v-if="pendding == 'product'">Products Refeeding...</a>
				<a class="btn btn-primary btn-big bg-orange col-12 max-width-1" v-else @click="refeed('product')">3. Refeed Products</a>
			</div>
			<div class="col col-12 border-box p1 center gray">
				<p>请按照以上 1、2、3 的顺序 Refeed.</p>
				<p>如果没有新建或修改或删除带 > 的 Collection，则 1 不用执行.</p>
				<p>如果没有新建或修改或删除 Collection，则 2 不用执行.</p>
				<p>如果没有新建或修改或删除 Product，则 3 不用执行.</p>
				<p>Refeed 表示从 Shopify 重新获取数据，并重新发布到 Vespa Search Engine.</p>
				<p>如果你不确定或不知道 Refeed 是什么意思，或者不清楚应该执行哪个或哪几个，请联系管理员。（见页面底部）</p>
			</div>
		</div>
		<div class="fixed top-0 bottom-0 left-0 right-0 z1 flex items-center justify-center flex-wrap content-center center bg-yellow" v-show="!!pendding">
			<img src="../assets/loading-bubbles.svg" width="100" height="100">
			<h1 class="m0 col-12 mx-auto center">Refeeding...Please wait...</h1>
		</div>
	</layout>
</template>

<script>
import Layout from '@/components/Layout'
export default {
	name: 'VendorMap',
	data () {
		return {
			pendding: false
		}
	},
	methods: {
		refeed (t) {
			let self = this
			self.pendding = t
			self.$http.get('websh/refeed?t=' + t).then(({ data }) => {
				self.pendding = ''
				if (data == 0) swal('Success', '', 'success')
				else swal('Oops...', 'Please try again later', 'error')
			}, (response) => {
				self.pendding = ''
				swal('Oops...', 'Please try again later', 'error')
			})
		}
	},
	components: {
		Layout
	}
}
</script>

<style scoped></style>
