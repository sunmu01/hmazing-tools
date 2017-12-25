<template>
	<layout>
		<div class="clearfix center p2">
  			<tinymce id="d1" v-model="output" :toolbar1="toolbar1"></tinymce>
  			<div class="col col-12 border-box p2 border border-silver mt2" v-if="output != ''">
  				<a class="btn btn-primary bg-teal right" @click="copys(output)">Copy Output</a>
  				<div class="h3 p2 border-bottom border-silver">Output</div>
  				<div class="col col-12 border-box p2 navy">{{ output }}</div>
  			</div>
		</div>
	</layout>
</template>

<script>
import Layout from '@/components/Layout'
import tinymce from 'vue-tinymce-editor'
export default {
	name: 'MceEditor',
	data () {
		return {
			output: '',
			toolbar1: 'formatselect fontsizeselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
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
		Layout: Layout,
		'tinymce': tinymce
	}
}
</script>

<style scoped>
	#d1 {
		height: 500px
	}
</style>
