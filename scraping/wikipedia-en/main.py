import json
import sys
from read_page import read_page_a

with open("urls.json") as f:
    urls = json.load(f)

def print_color_url(url, file=sys.stderr):
    print(f"\033[32m{url}\033[0m", file=file)

def read_all_a():
    for url in urls['type_a']:
        print_color_url(url)
        print(read_page_a(url))

if __name__ == "__main__":
    read_all_a()