import sys

from get_city_info import get_city_info
from read_page import read_page_a


if __name__ == "__main__":
    cities = read_page_a("https://en.wikipedia.org/wiki/List_of_twin_towns_and_sister_cities_in_Japan")
    # print(cities, file=sys.stderr)

    for city in cities:
        url = city['city_url']
        name = city['city_name']
        print(name, url, file=sys.stderr)
        info = get_city_info(city['city_url'], name=city['city_name'])
        print(info)