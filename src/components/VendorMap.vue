<template>
	<layout>
		<div class="clearfix center p2">
			<p class="h1">Vendors Management</p>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Logo</th>
						<th>Description</th>
						<th>Products Count</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(v, i) in vendors">
						<td>{{ v.title }}</td>
						<td>
							<input class="input" type="text" v-model="v.logo" v-if="v.editing">
							<span v-else>{{ v.logo }}</span>
						</td>
						<td>
							<input class="input" type="text" v-model="v.desc" v-if="v.editing">
							<span v-else>{{ v.desc }}</span>
						</td>
						<td>{{ v.count }}</td>
						<td>
							<a @click="editData(i)">
								<span v-if="v.editing">Save</span><span v-else>Edit</span>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</layout>
</template>

<script>
import Layout from '@/components/Layout'
export default {
	name: 'VendorMap',
	data () {
		return {
			vendors: []
		}
	},
	created () {
		this.fetchData().then((response) => {
			console.log(response)
		})
	},
	methods: {
		editData (i) {
			let self = this
			self.vendors[i].editing = !self.vendors[i].editing
			if (!self.vendors[i].editing) {
				self.saveData()
			}
		},
		saveData () {
			var data = JSON.stringify(self.vendors)
			var params = { method: 'post', body: data }
			fetch('https://sea.hmazing.com/SaveJson.php', params)
			.then((response) => {
				return response.json()
			}).then((data) => {
				console.log(data)
			})
		},
		readData () {
			fetch('https://sea.hmazing.com/ReadJson.php')
			.then((response) => {
				return response.json()
			}).then((data) => {
				console.log(data)
				self.vendors = data
			})
		},
		fetchData () {
			let self = this
			let uri = 'https://sea.hmazing.com/search/?hits=0&yql=select%20*from%20sources%20product%20where%20price_min>-1|all(group(vendor)each(output(count())));'
			let fet = fetch(uri).then(self.checkStatus).then((response) => {
				let arr = response.root.children[0].children[0].children
				if (arr) {
					for (var i in arr) {
						self.vendors.push({
							title: arr[i].value,
							logo: '',
							desc: '',
							count: arr[i].fields['count()'],
							editing: false
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
</style>
