import sys
import json

from get_city_info import get_city_info
from read_page import read_page_a
from util import print_color_url


def save_json(obj, filepath: str):
    with open(filepath, 'w') as f:
        json.dump(obj, f, ensure_ascii=False)


def get_info(city):
    info = get_city_info(
        city['city_url'], name=city['city_name'], country='Japan')
    print(info, file=sys.stderr)

    sisters_info = []
    for sister in city['sister']:
        sis_info = get_city_info(
            name=sister['city_name'], wiki_url=sister['city_url'])
        sisters_info.append(sis_info)

    return {
        'city': info,
        'sisters': sisters_info
    }


if __name__ == "__main__":
    cities = read_page_a(
        "https://en.wikipedia.org/wiki/List_of_twin_towns_and_sister_cities_in_Japan")
    # print(cities, file=sys.stderr)

    for i, city in enumerate(cities):

        results.append(get_info(city))
        # res = get_info(city)

        # with open('cache/japan_cities.jsonl', mode='a') as f:
        #     json.dump(res, f)
        #     print(file=f)

        save_json(results, 'cache/japan_cities_temp.json')

    save_json(results, 'cache/japan_cities.json')
