import requests
from bs4 import BeautifulSoup
import pathlib
import json
from functools import cache

from copy import deepcopy

from util import print_color_url


def get_point(soup: BeautifulSoup):
    point = soup.find(attrs={"property": "georss:point"})
    if point:
        latitude, longtitude = map(float, point.get_text().split())
        return latitude, longtitude

    return (None, None)


def get_country(soup: BeautifulSoup):
    country_a = soup.find(attrs={"rel": "dbo:country"})
    if country_a:
        country_url = country_a.get("href")
        return pathlib.Path(country_url).name

    return None


def get_area(soup: BeautifulSoup):
    area_total = soup.find(attrs={"property": "dbo:areaTotal"})
    if area_total != None:
        area = float(area_total.get_text()) / 10**6
        return area

    area_total_km = soup.find(attrs={"property": "dbp:areaTotalKm"})
    if area_total_km != None:
        return float(area_total_km.get_text())

    area_km = soup.find(attrs={"property": "dbp:areaKm"})
    if area_km != None:
        return float(area_km.get_text())

    return None


def get_population(soup: BeautifulSoup):
    population = soup.find(attrs={"property": "dbp:populationTotal"})
    if population != None:
        try:
            val = int(population.get_text())
            return val
        except ValueError:
            return None

    return None


def get_abstract(soup: BeautifulSoup):
    abst = dict()
    abst_en = soup.find(attrs={'property': 'dbo:abstract', 'lang': 'en'})
    if abst_en:
        abst['en'] = abst_en.get_text()
    abst_en = soup.find(attrs={'property': 'dbo:abstract', 'lang': 'ja'})
    if abst_en:
        abst['ja'] = abst_en.get_text()
    return abst


@cache
def get_japanese_info(soup: BeautifulSoup, is_ja_pref=False):
    ret = dict()

    ja_elems = soup.find_all("small", string="dbpedia-ja")
    for ja_elem in ja_elems:
        ja_url = ja_elem.parent.get('href')
        ja_soup = BeautifulSoup(requests.get(ja_url).content, 'html.parser')

        pref = ja_soup.find(attrs={'property': 'prop-ja:都道府県'})
        if is_ja_pref:
            if pref:
                ret['prefecture'] = pref.get_text()
            else:
                # 都道府県が確認できない場合、市区町村の記事でない可能性が高いのでスキップ
                continue

        name_ja = ja_soup.find(attrs={'property': 'prop-ja:name'})
        if pref:
            ret['nameJa'] = name_ja.get_text()

        wiki_url_ja = ja_soup.find(attrs={'rel': 'foaf:isPrimaryTopicOf'})
        if wiki_url_ja:
            ret['urlJa'] = wiki_url_ja.get('href')

        ret = deepcopy(ret)
        del ja_soup

    ret_cp = deepcopy(ret)

    del ret

    return ret_cp


@cache
def get_city_info(wiki_url: str, name: str, country=None):
    name_with_country = pathlib.Path(wiki_url).name
    dbpedia_url = f"https://dbpedia.org/page/{name_with_country}"

    print_color_url(dbpedia_url)

    res = requests.get(dbpedia_url)
    soup = BeautifulSoup(res.content, "html.parser")
    latitude, longtitude = get_point(soup)

    if country == None:
        country = get_country(soup)
    area = get_area(soup)
    population = get_population(soup)

    abst = get_abstract(soup)

    ret = {
        "nameEn": name,
        "nameJa": "",
        "position": {
            "latitude": latitude,
            "longtitude": longtitude,
        },
        "country": country,
        "area": area,
        "wikiUrl": {
            "en": wiki_url,
        },
        "population": population,
        "abstract": abst
    }

    ja_info = None
    ja_info = get_japanese_info(soup, is_ja_pref=(country == 'Japan'))

    if ja_info:
        if 'urlJa' in ja_info.keys():
            ret["wikiUrl"]['ja'] = ja_info["urlJa"]
        if 'nameJa' in ja_info.keys():
            ret["nameJa"] = ja_info["nameJa"]
        if 'prefecture' in ja_info.keys():
            ret['prefecture'] = ja_info["prefecture"]

    ret_cp = deepcopy(ret)

    del ret
    del soup

    return ret_cp

# info = (get_city_info("https://en.wikipedia.org/wiki/Akita_(city)", "Arita"))
# print(info)
# print(json.dumps(info))
