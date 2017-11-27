import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import TransLocation from '@/components/TransLocation'
import TransImgSrc from '@/components/TransImgSrc'
import VendorMap from '@/components/VendorMap'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: Hello
		},
		{
			path: '/trans-location',
			name: 'TransLocation',
			component: TransLocation
		},
		{
			path: '/trans-img-src',
			name: 'TransImgSrc',
			component: TransImgSrc
		},
		{
			path: '/vendor-map',
			name: 'VendorMap',
			component: VendorMap
		}
	],
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
		
		if (to.hash) {
			return {
				selector: to.hash
				// , offset: { x: 0, y: 10 }
			}
		}
	}
})
