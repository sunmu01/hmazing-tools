<template>
	<layout>
		<div class="clearfix center p2">
			<p class="h1">Vendors Management</p>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Products Count</th>
						<th>Description</th>
						<th>Logo</th>
						<th>#</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(v, i) in vendors">
						<td>{{ v.title }}</td>
						<td>{{ v.count }}</td>
						<td><span>{{ v.desc }}</span></td>
						<td><img class="w1" :src="v.image"></td>
						<td><a class="btn" @click="editData(v)">Edit</a></td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="clearfix fixed top-0 bottom-0 left-0 right-0 border-box p2 flex items-center justify-center flex-wrap content-center bg-darken-4 z1" v-show="modaling">
			<div class="col-12 max-width-3 p2 bg-white rounded">
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Title:</label>
					<span class="col-10">{{ item.title }}</span>
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Description:</label>
					<textarea rows="5" class="textarea m0 col-10" v-model="item.desc"></textarea>
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Logo:</label>
					<textarea class="textarea m0 col-10" v-model="item.image"></textarea>
				</div>
				<div class="col col-12 border-box p1 center">
					<img class="max-h2 p1" :src="item.image">
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
	name: 'VendorMap',
	data () {
		return {
			api: 'https://sea.hmazing.com/',
			vendors: [],
			modaling: false,
			saving: false,
			item: {
				id: '',
				title: '',
				image: '',
				desc: '',
				count: 0
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
			let image = v.image == '' ? null : v.image
			let desc = v.desc == '' ? null : v.desc
			let data = JSON.stringify({
				"fields": {
					"image": { "assign": image },
					"description": { "assign": desc }
				}
			})
			let params = {
				method: 'put',
				body: data
			}
			let url = self.api + 'document/v1/hmazing/vendor/docid/' + v.id
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
			let url = self.api + 'search/?yql=select%20*from%20sources%20vendor%20where%20products_count%3E-1;'
			let fet = fetch(url).then(self.checkStatus).then((response) => {
				let arr = response.root.children
				if (arr) {
					for (var i in arr) {
						let image = arr[i].fields.image
						image = image == 'null' ? '' : image
						let desc = arr[i].fields.description
						desc = desc == 'null' ? '' : desc
						self.vendors.push({
							id: arr[i].fields.id,
							title: arr[i].fields.title,
							image: image,
							desc: desc,
							count: arr[i].fields.products_count
						})
					}
				}
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
