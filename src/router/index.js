import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import TransLocation from '@/components/TransLocation'
import TransImgSrc from '@/components/TransImgSrc'
import VendorsMap from '@/components/VendorsMap'
import LocationMap from '@/components/LocationMap'
import VespaRefeed from '@/components/VespaRefeed'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: '/tools/',
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: Hello,
			meta: { auth: false }
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: { auth: false }
		},
		{
			path: '/trans-location',
			name: 'TransLocation',
			component: TransLocation,
			meta: { auth: true }
		},
		{
			path: '/trans-img-src',
			name: 'TransImgSrc',
			component: TransImgSrc,
			meta: { auth: true }
		},
		{
			path: '/vendors-map',
			name: 'VendorsMap',
			component: VendorsMap,
			meta: { auth: true }
		},
		{
			path: '/location-map',
			name: 'LocationMap',
			component: LocationMap,
			meta: { auth: true }
		},
		{
			path: '/vespa-refeed',
			name: 'VespaRefeed',
			component: VespaRefeed,
			meta: { auth: true }
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

// Router Before Each Configuration
router.beforeEach((to, from, next) => {
	if (process.env.NODE_ENV == 'production') {
		// Redirect http: to https:
		let lo = window.location
		if ('https:' != lo.protocol) {
			window.location.href = 'https://' + lo.host + lo.pathname
		}
	}
	// Require Authenticate
	if (to.meta.auth && !localStorage.getItem('Token')) {
			next({ path: '/login' })
	} else {
		next()
	}
})

export default router
