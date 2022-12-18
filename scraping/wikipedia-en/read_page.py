from bs4 import BeautifulSoup, Tag, NavigableString
import sys
import requests
import re
from copy import deepcopy
import json
import time
import pathlib

def get_full_wikipedia_url(subpath: str):
    return "https://en.wikipedia.org" + subpath

def read_page_a(url: str, print_log=False):
    soup = BeautifulSoup(requests.get(url).content, "html.parser")
    main_content = soup.find(attrs={"id": "mw-content-text"}).div
    city_name = None
    city_url = None
    output = []

    def parse_ul(ul: Tag):
        all_link = ul.find_all("a")
        parsed = []
        city = {}
        turn = 0
        for link in all_link:
            href = link.get("href")
            if not "/wiki" in href:
                continue
            full_href = get_full_wikipedia_url(href)
            if turn % 2 == 0:
                city["country_name"] = link.get("title")
                city['country_url'] = full_href
            else:
                city["city_name"] = link.text
                city['city_url'] = full_href
                parsed.append(deepcopy(city))
            turn += 1
        return parsed

    for elem in main_content.children:
        inner_soup = BeautifulSoup(str(elem), 'html.parser')
        p = inner_soup.find("p", recursive=False)
        ul = inner_soup.find("ul", recursive=False)
        div = inner_soup.find("div", recursive=False)
        if p != None and inner_soup.p.b != None:
            link = inner_soup.p.b.a
            city_name = link.text
            city_url = get_full_wikipedia_url(link.get('href'))
            if print_log:
                print(city_name, city_url, file=sys.stderr)

        elif ul != None:
            sis_list = []
            for tag in inner_soup.find_all('ul'):
                sis_list.extend(parse_ul(tag))

            output.append({
                "city_name": city_name,
                "city_url": city_url,
                "sister": sis_list
            })

        elif div != None:
            if not div.get("class") or not "div-col" in div.get("class"):
                continue
            sis_list = []
            for tag in inner_soup.div.find_all('ul'):
                sis_list.extend(parse_ul(tag))
            output.append({
                "city_name": city_name,
                "city_url": city_url,
                "sister": sis_list
            })

    return output
