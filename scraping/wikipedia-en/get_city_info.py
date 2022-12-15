import requests
from bs4 import BeautifulSoup
import pathlib

def get_area(soup: BeautifulSoup):
    area_total = soup.find(attrs={"property": "dbo:areaTotal"})
    if area_total != None:
        area = float(area_total.get_text()) / 10**6
        return area

    area_total_km = soup.find(attrs={"property": "dbp:areaTotalKm"})
    if area_total_km != None:
        return float(area_total_km.get_text())

    return None

def get_population(soup: BeautifulSoup):
    population = soup.find(attrs={"property": "dbp:populationTotal"})
    if population != None:
        return int(population.get_text())
    
    return None

def get_city_info(wiki_url: str, name: str):
    name_with_country = pathlib.Path(wiki_url).name
    dbpedia_url = f"https://dbpedia.org/page/{name_with_country}"
    res = requests.get(dbpedia_url)
    soup = BeautifulSoup(res.content, "html.parser")

    point = soup.find(attrs={"property": "georss:point"})
    latitude, longtitude = map(float, point.get_text().split())
    country_url = soup.find(attrs={"rel": "dbo:country"}).get("href")
    country = pathlib.Path(country_url).name
    area = get_area(soup)
    population = get_population(soup)

    return {
        "nameEn": name,
        "nameJa": "",
        "position": {
            "latitude": latitude,
            "longtitude": longtitude
        },
        "country": country,
        "area": area,
        "wikiUrl": {
            "en": wiki_url,
        },
        "population": population
    }

