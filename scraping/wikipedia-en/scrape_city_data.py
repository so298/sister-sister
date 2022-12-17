import json
import sys
from copy import deepcopy
from bs4 import BeautifulSoup
import requests
import pathlib
from urllib.parse import urlparse

from util import parse_float, parse_int
from get_city_info import get_city_info


def get_dbpedia_url(wiki_url: str):
    parsed_url = urlparse(wiki_url)
    name_with_country = pathlib.Path(parsed_url.path).name
    dbpedia_url = f"https://dbpedia.org/page/{name_with_country}"
    return dbpedia_url


class CityInfo:
    def __init__(self, wiki_url: str, name: str, country: str) -> None:
        self.name = name
        self.country = country
        self.position = (0, 0)
        self.wiki_url = {
            "en": wiki_url,
            "ja": ""
        }
        self.area = 0
        self.population = 0
        self.abst = {
            "en": "",
            "ja": ""
        }
        self.prefecture = ""
        self.image = ""

    def scrape_data(self):
        data = get_city_info(self.wiki_url['en'], self.name, self.country)

        if data['nameJa'] != "":
            self.name = data['nameJa']
        
        pos = data['position']
        if pos['latitude'] and pos['longitude']:
            self.position = (pos['latitude'], pos['longitude']) 

        if data['area']:
            self.area = data['area']
        
        if data['wikiUrl']['ja']:
            self.wiki_url['ja'] = data['wikiUrl']['ja']
        
        if data['population']:
            self.population = data['population']
        
        abst = data['abstract']
        if abst['ja']:
            self.abst['ja'] = abst['ja']
        if abst['en']:
            self.abst['en'] = abst['en']
        
        if "prefecture" in data.keys():
            self.prefecture = data['prefecture']
        
        if data["image"]:
            self.image = data["image"]
        
    def parse_format(self):
        wiki_url = self.wiki_url
        return deepcopy({
            "cityName": self.name,
            "position": {
                "latitude": self.position[0],
                "longitude": self.position[1]
            },
            "country": self.country,
            "prefecture": self.prefecture,
            "population": self.population,
            "area": self.area,
            "wikiUrl": wiki_url['ja'] or wiki_url['en'],
            "wikiUrlEn": wiki_url['en'],
            "description": self.abst,
            "image": self.image
        })

if __name__ == "__main__":
    with open("data/city_graph.json") as f:
        graph = json.load(f)
    
    city_dict = dict()
    for city in graph:
        info = CityInfo(city['url'], city['name'], city['country_name'])
        info.scrape_data()
        city_dict[city['url']] = {
            "info": info.parse_format(),
            "sisterUrls": city['sisters']
        }

    with open("data/city_info.json", "w") as f:
        json.dump(list(city_dict.values()), f) 
    
