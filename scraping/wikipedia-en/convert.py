import json
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('path')

args = parser.parse_args()

path = args.path

with open(path) as f:
    original_data = json.load(f)

def convert(city: dict):
    converted = dict()
    keys = city.keys()

    if 'nameJa' in keys:
        converted['cityName'] = city['nameJa']
    else:
        converted['cityName'] = city['nameEn']
    
    converted

    return converted

converted_data = []
for i, city in enumerate(original_data):
    converted = convert(city)
