import json
import sys

from read_page import read_page_a
from util import print_color_url

with open("urls_with_country.json") as f:
    countries = json.load(f)

# build sister city graph
sis_graph = dict()
for country in countries:
    url: str = country['url']
    country: str = country['country']
    print_color_url(country)

    city_list = read_page_a(url)
    # print(city_list)

    for city in city_list:
        '''
        city {
            'city_name': string
            'city_url': string
            'sister': [
                {
                    'city_url': string
                }
            ]
        }
        '''
        city_node = {
            'name': city['city_name'],
            'url': city['city_url'],
            'sisters': []
        }

        for sister in city['sister']:
            city_node['sisters'].append(sister['city_url'])
        
        sis_graph[city_node['url']] = city_node
        
    print(sis_graph)