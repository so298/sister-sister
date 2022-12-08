import json
from read_page import read_page_a

with open("urls.json") as f:
    urls = json.load(f)

def read_all_a():
    for url in urls['type_a']:
        print(read_page_a(url))

if __name__ == "__main__":
    read_all_a()