from bs4 import BeautifulSoup
import requests
import re


root_url = "https://en.wikipedia.org/wiki/Lists_of_twin_towns_and_sister_cities"

root_soup = BeautifulSoup(requests.get(root_url).content, 'html.parser')

children_elems = root_soup.find_all(
    "a", attrs={"href": re.compile(r"wiki/List_of_[\w()]+$")})
children_urls = ["https://en.wikipedia.org" +
                 child_elem.get('href') for child_elem in children_elems]
print(*children_urls, sep="\n")


