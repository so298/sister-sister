import json

with open("data/city_data_all.json") as f:
    data = json.load(f)

with open("data/city_data_all_image.json") as f:
    data_image = json.load(f)

for i, city in enumerate(data_image):
    data[i]['image'] = city['image']

with open("data/city_data_all_image.json", "w") as f:
    json.dump(data, f)