// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource/dist/vue-resource.min'
Vue.use(VueResource)

Vue.http.options.root = process.env.API_URL
Vue.http.headers.common['Accept'] = 'application/json'
Vue.http.headers.common['Token'] = localStorage.getItem('Token')

Vue.http.interceptors.push((request, next) => {
	next((response) => {
		// If the token is invalid
		if (response.status === 401) {
			// If view require authenticate, go to login
			if (router.currentRoute.meta.auth) {
				router.replace('/login')
			}
		}
	})
})

Vue.config.productionTip = false

import Clipboard from 'v-clipboard'
Vue.use(Clipboard)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
