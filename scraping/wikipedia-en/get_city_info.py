import requests
from bs4 import BeautifulSoup
import pathlib
import json
from functools import cache

from util import print_color_url, parse_float, parse_int


def get_point(soup: BeautifulSoup):
    point = soup.find(attrs={"property": "georss:point"})
    if point:
        latitude, longtitude = map(parse_float, point.get_text().split())
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
        area_m2 = parse_float(area_total.get_text())
        if area_m2:
            return area_m2 / 10**6

    area_total_km = soup.find(attrs={"property": "dbp:areaTotalKm"})
    if area_total_km != None:
        parsed = parse_float(area_total_km.get_text())
        if parsed:
            return parsed

    area_km = soup.find(attrs={"property": "dbp:areaKm"})
    if area_km != None:
        return parse_float(area_km.get_text())

    return None


def get_population(soup: BeautifulSoup):
    population = soup.find(attrs={"property": "dbp:populationTotal"})
    if population != None:
        val = parse_int(population.get_text())
        return val

    return None


def get_abstract(soup: BeautifulSoup):
    abst = {'ja': None, 'en': None}
    abst_en = soup.find(attrs={'property': 'dbo:abstract', 'lang': 'en'})
    if abst_en:
        abst['en'] = abst_en.get_text()
    abst_en = soup.find(attrs={'property': 'dbo:abstract', 'lang': 'ja'})
    if abst_en:
        abst['ja'] = abst_en.get_text()
    return abst

def get_img_path(soup: BeautifulSoup):
    img = soup.find("img", attrs={"alt": "thumbnail"})
    if img:
        return img.get("src")
    return None

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
        if name_ja:
            ret['nameJa'] = name_ja.get_text()

        wiki_url_ja = ja_soup.find(attrs={'rel': 'foaf:isPrimaryTopicOf'})
        if wiki_url_ja:
            ret['urlJa'] = wiki_url_ja.get('href')
        
        abst_ja = ja_soup.find(attrs={"property": "dbo:abstract"})
        if abst_ja:
            ret['abstract'] = abst_ja.get_text()

    return ret

def get_city_info(wiki_url: str, name: str, country: str | None=None):
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
    img = get_img_path(soup)

    ret = {
        "nameEn": name,
        "nameJa": "",
        "position": {
            "latitude": latitude,
            "longitude": longtitude,
        },
        "country": country,
        "area": area,
        "wikiUrl": {
            "en": wiki_url,
            "ja": None
        },
        "population": population,
        "abstract": abst,
        "image": img
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
        if 'abstract' in ja_info.keys():
            ret['abstract']['ja'] = ja_info['abstract']

    return ret

# info = (get_city_info("https://en.wikipedia.org/wiki/Akita_(city)", "Arita"))
# print(info)
# print(json.dumps(info))
