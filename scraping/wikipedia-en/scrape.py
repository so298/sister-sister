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


root_url = "https://en.wikipedia.org/wiki/Lists_of_twin_towns_and_sister_cities"

root_soup = BeautifulSoup(requests.get(root_url).content, 'html.parser')

children_elems = root_soup.find_all(
    "a", attrs={"href": re.compile(r"wiki/List_of_[\w()]+$")})
children_urls = [get_full_wikipedia_url(
    child_elem.get('href')) for child_elem in children_elems]
# print(*children_urls, sep="\n")


def read_child_page(url: str):
    soup = BeautifulSoup(requests.get(url).content, "html.parser")
    main_content = soup.find(attrs={"class": "mw-parser-output"})
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
            print(city_name, city_url, file=sys.stderr)
        elif ul != None:
            output.append({
                "city_name": city_name,
                "city_url": city_url,
                "sister": parse_ul(inner_soup.ul)
            })

        elif div != None:
            if not div.get("class") or not "div-col" in div.get("class"):
                continue
            output.append({
                "city_name": city_name,
                "city_url": city_url,
                "sister": parse_ul(inner_soup.div.ul)
            })

    return output


# print(json.dumps(read_child_page(children_urls[0])))

# all_info = []
for child_url in children_urls:
    print(child_url, file=sys.stderr)
    time.sleep(0.1)

    url_path = pathlib.Path(child_url)
    with open(f"cache/{url_path.name}.json", "w") as f:
        print(
            f"\033[32m save to {f'cache/{url_path.name}.json'}\033[0m", file=sys.stderr)
        json.dump({
            "page_url": child_url,
            "content": read_child_page(child_url)
        }, f)
