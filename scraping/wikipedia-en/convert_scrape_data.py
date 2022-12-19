import json
import sys
from copy import deepcopy

with open("data/city_info.json") as f:
    data = json.load(f)

city_dict = dict()
for i, city in enumerate(data):
    city_dict[city['info']['wikiUrlEn']] = city

# detect name duplication
dupl_name_list = set()
name_set = set()
for city in city_dict.values():
    city_name: str = city['info']['cityName']
    if city_name in name_set:
        dupl_name_list.add(city_name[:])
    name_set.add(city_name[:])

# remap city name
for city in city_dict.values():
    info = city['info']
    if info["cityName"] in dupl_name_list:
        info['cityName'] += f" ({info['country']})"

# change to two-way graph
city_dict_cp = deepcopy(city_dict)
for city in city_dict.values():
    for sister in city['sisterUrls']:
        if sister in city_dict.keys():
            print(sister)
            city_dict_cp[sister]['sisterUrls'].append(city['info']['wikiUrlEn'])

city_dict = city_dict_cp

# map url to city name
for city in city_dict.values():
    sister_names = set()
    for sister in city['sisterUrls']:
        if sister in city_dict.keys():
            sister_names.add(city_dict[sister]['info']['cityName'][:])
    city['info']['sisterCities'] = list(sister_names)

output = []
for city in city_dict.values():
    city_info = deepcopy(city['info'])
    city_info['descriptionEn'] = city_info['description']['en']
    city_info['description'] = city_info['description'] ['ja'] or city_info['description']['en']
    output.append(city_info)

with open('data/city_data_all.json', 'w') as f:
    json.dump(output, f, ensure_ascii=False)