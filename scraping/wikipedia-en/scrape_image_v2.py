import json
import requests
from PIL import Image
from io import BytesIO
import time
from urllib.parse import urlparse
import pathlib

with open("data/city_data_all_image.json") as f:
    data = json.load(f)

HEADER = {"User-Agent": "infovis/0.1"}

def save_image(url: str, city_name: str):
    try:
        res = requests.get(url, headers=HEADER)
        if res.status_code == 200:
            path = urlparse(url).path
            suffix = pathlib.Path(path).suffix
            savepath = f'images/{city_name}{suffix}'
            with open(savepath, "wb") as f:
                f.write(res.content)
            return savepath
        else:
            print(res)
    except KeyboardInterrupt as e:
        print(e)
        exit(1)
    except:
        pass
    
    return "noImage.png"

new_data = []
for i, city in enumerate(data):
    img_url = city['image']
    print(f"{i + 1} / {len(data)}", city['cityName'], img_url, flush=True)
    if img_url == "noImage.png":
        wiki_url = city['wikiUrlEn']
        parsed = urlparse(wiki_url)
        article_name = pathlib.Path(parsed.path).name
        summary = requests.get(f"http://{parsed.netloc}/api/rest_v1/page/summary/{article_name}", headers=HEADER)
        summary = json.loads(summary.content)
        # print(summary)

        if "thumbnail" in summary.keys():
            print(summary['thumbnail']['source'])
            time.sleep(.3)
            save_name = city['cityName'].replace(" ", "_").replace("/", "-")
            img_name = save_image(summary['thumbnail']['source'], save_name)
            print(img_name)
            city['image'] = img_name

        time.sleep(.3)
    new_data.append(city)

    if i % 10 == 0:
        with open("cache/city_data_all_image_temp.json", "w") as f:
            json.dump(new_data, f)

with open("cache/city_data_all_image.json", "w") as f:
    json.dump(new_data, f)