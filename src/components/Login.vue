<template>
	<div class="clearfix center p2 bg-yellow fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
		<div class="col-12 max-width-2 border-box p3 rounded bg-white" style="box-shadow: 0 0 30px 0 #999">
			<div class="col-12 border-box p2 border-bottom border-silver">
				<router-link class="h1 m0 p1 orange" to="/">Hmazing Tools</router-link>
				<div class="m0 mt1 h3 gray">Some tools require authentication</div>
			</div>
			<div class="col-12 border-box p2 mt1">
				<input class="input center" type="text" placeholder="username" v-model="user.username">
				<input class="input center" type="password" placeholder="password" v-model="user.password">
				<a class="col-12 btn btn-outline" @click="login">Login</a>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
	name: 'Hello',
	data () {
		return {
			user: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		login () {
			let self = this
			self.$http.post('websh/login', self.user).then(({ data }) => {
				if (data == 'None') {
					swal('Oops!', 'username or password wrong', 'error')
				} else {
					localStorage.setItem('token', data)
					Vue.http.headers.common['Token'] = data
					swal({ icon: 'success', title: 'Success' }).then(() => {
						self.$router.replace('/')
					})
				}
			}, (response) => {
				swal('Oops...', 'Please try again later', 'error')
			})
		}
	},

}
</script>

<style scoped></style>
