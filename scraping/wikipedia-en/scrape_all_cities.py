import json
import sys
from copy import deepcopy

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
            'country_name': country,
            'url': city['city_url'],
            'sisters': set()
        }

        for sister in city['sister']:
            city_node['sisters'].add(sister['city_url'])
        
        sis_graph[city_node['url']] = city_node
        
    # print(sis_graph)

# make two-way edged
sis_graph_cp = deepcopy(sis_graph)
for key_url, node in sis_graph.items():
    for sister_url in node['sisters']:
        if sister_url in sis_graph_cp.keys():
            # I didn't scrape philipines page, so there may be non-exists node
            sis_graph_cp[sister_url]['sisters'].add(key_url)

sis_graph = sis_graph_cp

# change set to list
for node in sis_graph.values():
    node['sisters'] = list(node['sisters'])

with open("data/city_graph.json", "w") as f:
    json.dump(sis_graph, f)
