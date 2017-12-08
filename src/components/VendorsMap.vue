<template>
	<layout>
		<div class="clearfix center p2">
			<p class="h1">Vendors Management</p>
			<a class="btn btn-outline border-navy right mt-2b1" @click="addData">Add New Vendor Infomation</a>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Logo</th>
						<th>#</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(v, i) in vendors">
						<td>{{ v.title }}</td>
						<td>{{ v.description }}</td>
						<td><img class="w1" :src="v.image"></td>
						<td><a class="btn" @click="editData(v)">Edit</a></td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="clearfix fixed top-0 bottom-0 left-0 right-0 border-box p2 flex items-center justify-center flex-wrap content-center bg-darken-4 z1" v-show="modaling">
			<div class="col-12 max-width-3 p2 bg-white rounded">
				<div class="col col-12 border-box p1 mb2 border-bottom border-silver">
					<a class="btn p0 gray right btn-close" @click="closeModal">&times;</a>
					<h3 class="center mb2" v-if="adding">Add Vendor</h3>
					<h3 class="center mb2" v-else>Edit Vendor</h3>
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Title:</label>
					<input class="col-10 input" type="text" v-model="item.title">
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Description:</label>
					<textarea rows="5" class="textarea m0 col-10" v-model="item.description"></textarea>
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Logo:</label>
					<textarea class="textarea m0 col-10" v-model="item.image"></textarea>
				</div>
				<div class="col col-12 border-box p3 center">
					<img class="max-h2" :src="item.image">
				</div>
				<div class="col col-12 border-box p1 center">
					<a class="btn btn-big btn-primary px4 bg-gray" v-if="saving">Saving...</a>
					<a class="btn btn-big btn-primary px4" @click="saveData(item)" v-else>Save</a>
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
			vendors: [],
			item: {
				id: '',
				title: '',
				image: '',
				description: ''
			},
			modaling: false,
			saving: false,
			adding: false
		}
	},
	created () {
		this.fetchData()
	},
	methods: {
		closeModal () {
			let self = this
			if (self.adding) {
				self.vendors.pop()
				self.adding = false
			}
			self.modaling = false
		},
		addData () {
			let self = this
			self.adding = true
			self.vendors.push({
				id: '',
				title: '',
				image: '',
				description: ''
			})
			let i = self.vendors.length - 1
			self.item = self.vendors[i]
			self.modaling = true
		},
		editData (v) {
			let self = this
			self.modaling = true
			self.item = v
		},
		saveData (v) {
			let self = this
			self.saving = true
			v.id = v.title
			self.$http.post('websh/vendors', self.vendors).then(({ data }) => {
				swal('Success', '', 'success')
				self.modaling = false
				self.saving = false
				self.adding = false
			}, (response) => {
				swal('Oops...', 'Please try again later', 'error')
			})
		},
		fetchData () {
			let self = this
			self.$http.get('websh/vendors').then(({ data }) => {
				self.vendors = data
			}, (response) => {
				swal('Oops...', 'Please try again later', 'error')
			})
		}
	},
	components: {
		Layout
	}
}
</script>

<style scoped></style>
