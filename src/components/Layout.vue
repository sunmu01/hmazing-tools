<template>
	<div class="clearfix">
		<router-link class="p2 left" to="/">◀ back</router-link>
		<slot></slot>
		<div class="fixed bottom-0 left-0 right-0 p2 bg-black gray center h6 m0">
			<span class="p1">© Copy Right By Hmazing</span>
			<span class="p1">如果有问题请联系管理员：周日</span>
			<span class="p1">微信/QQ：<a>1114211821</a></span>
		</div>
		<a href="#" class="p2 fixed right-0 bottom-0">▲ top</a>
	</div>
</template>

<script>
export default {
	name: 'Layout'
}
</script>

<style scoped></style>
