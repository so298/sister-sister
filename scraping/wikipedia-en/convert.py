import json
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('path')

args = parser.parse_args()

path = args.path

with open(path) as f:
    original_data = json.load(f)

print(original_data[0])