import json
import sys
from read_page import read_page_a
from util import print_color_url

with open("urls.json") as f:
    urls = json.load(f)

def read_all_a():
    for url in urls['type_a']:
        print_color_url(url)
        print(read_page_a(url))

if __name__ == "__main__":
    read_all_a()