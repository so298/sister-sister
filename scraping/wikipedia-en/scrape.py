from bs4 import BeautifulSoup, Tag, NavigableString
import sys
import requests
import re
from copy import deepcopy
import json
import time
import pathlib

from read_page import get_full_wikipedia_url, read_page_a

if __name__ == "__main__":
    root_url = "https://en.wikipedia.org/wiki/Lists_of_twin_towns_and_sister_cities"

    root_soup = BeautifulSoup(requests.get(root_url).content, 'html.parser')

    children_elems = root_soup.find_all(
        "a", attrs={"href": re.compile(r"wiki/List_of_[\w()]+$")})
    children_urls = [get_full_wikipedia_url(
        child_elem.get('href')) for child_elem in children_elems]
    # print(*children_urls, sep="\n")

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
                "content": read_page_a(child_url)
            }, f)
