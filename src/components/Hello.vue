<template>
	<div class="clearfix center p2">
		<h1 class="p1">Hmazing Tools</h1>
		<h3 class="regular">This is a tool collection for Hmazing Shopify Admins</h3>
		<ul class="list-reset">
			<li><router-link to="/trans-location">Location Transformer</router-link></li>
			<li><router-link to="/trans-img-src">Image Link Transformer</router-link></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Hello'
}
</script>

<style scoped>
a:hover {
	color: deeppink;
}
ul.list-reset > li {
	padding: .5rem;
}
</style>
