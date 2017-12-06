<template>
	<layout>
		<div class="clearfix center p2">
			<p class="h1">Locations Management</p>
			<table>
				<thead>
					<tr>
						<th>Location Name</th>
						<th>Full Location Name</th>
						<th>Description</th>
						<th>Latitude</th>
						<th>Longitude</th>
						<th>LatLng</th>
						<th>#</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(v, i) in locations">
						<td>{{ v.name }}</td>
						<td>{{ v.long }}</td>
						<td>{{ v.desc }}</td>
						<td>{{ v.lat }}</td>
						<td>{{ v.lng }}</td>
						<td>{{ v.ll }}</td>
						<td><a class="btn" @click="editData(v)">Edit</a></td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="clearfix fixed top-0 bottom-0 left-0 right-0 border-box p2 flex items-center justify-center flex-wrap content-center bg-darken-4 z1" v-show="modaling">
			<div class="col-12 max-width-3 p2 bg-white rounded">
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Location Name:</label>
					<span class="col-10">{{ item.name }}</span>
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Full Location Name:</label>
					<textarea class="textarea m0 col-10" v-model="item.long"></textarea>
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Description:</label>
					<textarea rows="5" class="textarea m0 col-10" v-model="item.desc"></textarea>
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Latitude:</label>
					<input class="col-10 input" type="text" v-model="item.lat">
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Longitude:</label>
					<input class="col-10 input" type="text" v-model="item.lng">
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">LatLng:</label>
					<input class="col-10 input" type="text" v-model="item.ll">
				</div>
				<div class="col col-12 border-box p1 center">
					<a class="btn btn-primary px4 bg-gray" v-if="Saving">Saving</a>
					<a class="btn btn-primary px4" @click="saveData(item)" v-else>Save</a>
				</div>
			</div>
		</div>
	</layout>
</template>

<script>
import Layout from '@/components/Layout'
export default {
	name: 'LocationMap',
	data () {
		return {
			api: process.env.API_URL,
			locations: [],
			modaling: false,
			saving: false,
			item: {
				id: '',
				name: '',
				long: '',
				desc: '',
				lat: '',
				lng: '',
				ll: ''
			}
		}
	},
	created () {
		this.fetchData().then((response) => {
			console.log(response)
		})
	},
	methods: {
		editData (v) {
			let self = this
			self.modaling = true
			self.item = v
		},
		saveData (v) {
			let self = this
			self.saving = true
			let data = JSON.stringify(self.locations)
			let params = { method: 'post', body: data }
			let url = self.api + 'shweb/uplocmap'
			fetch(url, params).then((response) => {
				return response.json()
			}).then((data) => {
				console.log(data)
				self.modaling = false
				self.saving = false
			})
		},
		fetchData () {
			let self = this
			let url = self.api + 'trees/locmap.json'
			let fet = fetch(url).then(self.checkStatus).then((response) => {
				self.locations = response
				return response
			})
			return fet
		},
		checkStatus (response) {
			if (response.ok && response.status >= 200 && response.status < 300) {
				var contentType = response.headers.get("content-type")
				if (contentType && contentType.includes("application/json")) 
					return response.json()
				throw new TypeError("Oops, we haven't got JSON!")
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}
	},
	components: {
		Layout: Layout
	}
}
</script>

<style scoped>
table {
	width: 100%;
	max-width: 100%;
	border-spacing: 0;
	border-collapse: collapse;
	background-color: transparent;
}
table > thead {
	background-color: #e5e5e5;
}
td, th {
	padding: .5rem;
	border-top: 1px solid #e5e5e5;
}
table > tbody > tr:hover {
	background-color: #f5f5f5;
}
.w1 {
	max-width: 100px;
}
.max-h2 {
	max-height: 200px;
}
</style>
