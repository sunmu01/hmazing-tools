<template>
	<layout>
		<div class="clearfix center p2">
			<p class="h1">Locations Management</p>
			<a class="btn btn-outline border-navy right mt-2b1" @click="addData">Add New Location Infomation</a>
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
			<div class="col-12 max-width-4 p2 bg-white rounded">
				<div class="col col-12 border-box p1 mb2 border-bottom border-silver">
					<a class="btn p0 gray right btn-close" @click="closeModal">&times;</a>
					<h3 class="center">Search Place</h3>
					<vue-google-autocomplete 
						id="vg-map" 
						ref="vg-place"
						classname="col-8 input border-orange mx-auto" 
						placeholder="You can use this to search a place"
						types="geocode" 
						v-on:placechanged="getPlace"
					></vue-google-autocomplete>
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Location Name:</label>
					<input class="col-10 input" type="text" v-model="item.name">
				</div>
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Full Location Name:</label>
					<input class="col-10 input" type="text" v-model="item.long">
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
				<div class="col col-12 border-box p1 flex items-start justify-start">
					<label class="label col-2">Description:</label>
					<textarea rows="5" class="textarea m0 col-10" v-model="item.desc"></textarea>
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
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
	name: 'LocationMap',
	data () {
		return {
			locations: [],
			item: {
				id: '',
				name: '',
				long: '',
				desc: '',
				lat: '',
				lng: '',
				ll: ''
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
		getPlace (address, place, id) {
			let self = this
			let s = JSON.stringify(place)
			let p = JSON.parse(s)
			console.log(p)
			self.item.id = place.place_id
			if (self.item.name == '')
				self.item.name = place.name
			self.item.long = place.formatted_address
			let lat = address.latitude.toFixed(6)
			let lng = address.longitude.toFixed(6)
			self.item.lat = lat
			self.item.lng = lng
			self.item.ll = self.getLL(lat, lng)
		},
		getLL (lat, lng) {
			lat = lat < 0 ? 'S' + Math.abs(lat) : 'N' + lat
			lng = lng < 0 ? 'W' + Math.abs(lng) : 'E' + lng
			return lng + ';' + lat
		},
		formatLLL (value) {
			return value.toFixed(6)
		},
		closeModal () {
			let self = this
			if (self.adding) {
				self.locations.pop()
				self.adding = false
			}
			self.modaling = false
		},
		addData () {
			let self = this
			self.adding = true
			self.locations.push({
				id: '',
				name: '',
				long: '',
				desc: '',
				lat: '',
				lng: '',
				ll: ''
			})
			let i = self.locations.length - 1
			self.item = self.locations[i]
			self.modaling = true
		},
		editData (v) {
			let self = this
			self.item = v
			self.modaling = true
		},
		saveData (v) {
			let self = this
			self.saving = true
			self.$http.post('websh/locmap', self.locations).then(({ data }) => {
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
			self.$http.get('websh/locmap').then(({ data }) => {
				self.locations = data
			}, (response) => {
				swal('Oops...', 'Please try again later', 'error')
			})
		}
	},
	components: {
		Layout,
		VueGoogleAutocomplete
	}
}
</script>

<style scoped></style>
