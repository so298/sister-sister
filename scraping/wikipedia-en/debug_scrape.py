import scrape
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("url")

args = parser.parse_args()

url = args.url

print(url)
out = scrape.read_child_page(url)
print(out)
