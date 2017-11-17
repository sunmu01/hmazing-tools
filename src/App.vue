<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import 'sweetalert'
	import 'ace-css/css/ace.min.css'
	export default {
		name: 'app'
	}
</script>

<style>
html, body {
	margin-top: 0;
	padding: 0;
	color: #555;
}
a {
	cursor: pointer;
}
</style>
