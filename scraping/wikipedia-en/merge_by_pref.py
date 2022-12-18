import json
import sys
from collections import defaultdict
from copy import deepcopy

with open("data/japan_cities_name_indexed.json") as f:
    data = json.load(f)

def merge_city(c1, c2):
    new_city = deepcopy(c1)
    new_city['area'] += c2['area']
    new_city['cityName'] = c1['prefecture']
    new_city['population'] += c2['population']

    for sis in c2['sisterCities']:
        new_city['sisterCities'].append(sis)

    return new_city

pref_merged = dict()
merged_data = []
for city in data:
    pref = city['prefecture']
    if pref == "No data":
        merged_data.append(city)
    else:
        if not pref in pref_merged.keys():
            pref_merged[pref] = deepcopy(city)
            pref_merged[pref]['cityName'] = pref
        else:
            pref_merged[pref] = merge_city(pref_merged[pref], city)

merged_data.extend(list(pref_merged.values()))

merged_data.sort(key=lambda x: x['id'])
print(json.dumps(merged_data, ensure_ascii=False))
    