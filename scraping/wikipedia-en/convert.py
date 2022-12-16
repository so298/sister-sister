import json
import argparse
import sys

parser = argparse.ArgumentParser()
parser.add_argument('input')
parser.add_argument('output')

args = parser.parse_args()

path = args.input
output = args.output

with open(path) as f:
    original_data = json.load(f)


def get_name(city):
    if city['nameJa']:
        return city['nameJa']
    elif city['nameEn']:
        return city['nameEn']
    else:
        return 'unknown'

def get_position(city):
    if city['position']['latitude']:
        return city['position']
    return {
        'latitude': 0,
        'longtitude': 0
    }

def get_prefecture(city):
    if 'prefecture' in city.keys():
        return city['prefecture']
    return 'No data'

def get_population(city):
    if 'population' in city.keys():
        if city['population']:
            return city['population']
    
    return 0

def get_area(city):
    if 'area' in city.keys():
        if city['area']:
            return city['area']
    
    return 0

def get_wikiurl(city):
    if 'ja' in city['wikiUrl'].keys():
        return city['wikiUrl']['ja']
    else:
        return city['wikiUrl']['en']

def get_description(city):
    if 'ja' in city['abstract'].keys():
        return city['abstract']['ja']
    else:
        return city['abstract']['en']


def parse_elem(elem: dict):
    city = elem['city']
    sisters = elem['sisters']
    converted = dict()
    keys = city.keys()

    converted['cityName'] = get_name(city)
    
    converted['position'] = get_position(city)
    converted['country'] = 'Japan'

    converted['population'] = get_population(city)

    converted['prefecture'] = get_prefecture(city)
    
    converted['sisterCities'] = []
    converted['sisterCitiesId'] = []
    for sister in sisters:
        converted['sisterCities'].append(sister['wikiUrl']['en'])
        converted['sisterCitiesId'].append(sister['wikiUrl']['en'])

    converted['wikiUrl'] = get_wikiurl(city)
    converted['description'] = get_description(city)

    return converted

def parse_sister(city):
    converted = dict()
    keys = city.keys()

    converted['cityName'] = get_name(city)
    
    converted['position'] = get_position(city)
    converted['country'] = 'Japan'

    converted['prefecture'] = get_prefecture(city)

    converted['population'] = get_population(city)
    
    converted['sisterCities'] = []
    converted['sisterCitiesId'] = []
    converted['wikiUrl'] = get_wikiurl(city)
    converted['description'] = get_description(city)

    return converted


converted_data = []
city_dict = dict()

for i, elem in enumerate(original_data):
    city_item = elem['city']
    sisters = elem['sisters']

    city_dict[city_item['wikiUrl']['en']] = parse_elem(elem)

    for sister in elem['sisters']:
        if not sister['wikiUrl']['en'] in city_dict.keys():
            city_dict[sister['wikiUrl']['en']] = parse_sister(sister)

# put id
for i, (_, city) in enumerate(city_dict.items()):
    city['id'] = i + 1

# map sister id
for _, (_, city) in enumerate(city_dict.items()):
    for i, url in enumerate(city['sisterCities']):
        city['sisterCitiesId'][i] = city_dict[url]['id']
        city['sisterCities'][i] = city_dict[url]['cityName']

# append data
converted_data = list(city_dict.values())

print(f'city count: {len(converted_data)}', file=sys.stderr)

with open(output, 'w') as f:
    json.dump(converted_data, f, ensure_ascii=False)
