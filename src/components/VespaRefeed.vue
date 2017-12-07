<template>
	<layout>
		<div class="clearfix center p2">
			<p class="h1">Refeed Vespa Feeds</p>
			<a class="btn btn-primary btn-big" @click="refeed('project')">Refeed Projects</a>
			<a class="btn btn-primary btn-big" @click="refeed('collection')">Refeed Collections</a>
			<a class="btn btn-primary btn-big" @click="refeed('catetory')">Refeed Categories</a>
		</div>
	</layout>
</template>

<script>
import Layout from '@/components/Layout'
export default {
	name: 'VendorMap',
	methods: {
		refeed (t) {
			let self = this
			self.$http.get('websh/refeed?t=' + t).then(({ data }) => {
				console.log(data)
			}, (response) => {
				swal({ icon: 'error', title: 'Oops...' }).then(() => { 
					self.$router.replace(self.$route.fullPath)
				})
			})
		}
	},
	components: {
		Layout
	}
}
</script>

<style scoped></style>
