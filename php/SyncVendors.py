import json
import requests

class DataSyncer:

	def main(self):
		self.syncData()

	def syncData(self):
		res = requests.get(str('https://sea.hmazing.com/search/?hits=0&yql=select%20*from%20sources%20product%20where%20price_min>-1|all(group(vendor)each(output(count())));'
))
		jsons = json.loads(res)
		unparsed_json = jsons.root.children[0].children[0].children
		datas = []
		for d in unparsed_json:
			datas.append({ title: d.value, logo: '', desc: '', count: d.fields['count()'] })
		print(json.dumps(datas))

if __name__ == '__main__':
	DataSyncer().main()
