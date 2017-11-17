<template>
	<div class="clearfix">
		<router-link class="p2 left" to="/">< back</router-link>
		<slot></slot>
		<a href="#" class="p2 fixed right-0 bottom-0">^ top</a>
	</div>
</template>

<script>
export default {
	name: 'Layout'
}
</script>

<style scoped>
a:hover {
	color: deeppink;
}
</style>
