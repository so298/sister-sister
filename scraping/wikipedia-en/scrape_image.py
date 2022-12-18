import json
import requests
from PIL import Image
from io import BytesIO
import time
from urllib.parse import urlparse
import pathlib

with open("data/city_data_all.json") as f:
    data = json.load(f)

def save_image(url: str, city_name: str):
    try:
        res = requests.get(url)
        if res.status_code == 200:
            with BytesIO(res.content) as buf:
                img = Image.open(buf)
                path = urlparse(img_url).path
                suffix = pathlib.Path(path).suffix
                savepath = f'images/{city_name}{suffix}'
                img.save(savepath)
                return savepath
    except KeyboardInterrupt as e:
        print(e)
        exit(1)
    except:
        pass
    
    return "noImage.png"

new_data = []
for i, city in enumerate(data):
    img_url = city['image']
    print(f"{i + 1} / {len(data)}", city['cityName'], img_url)
    img_name = save_image(img_url, city['cityName'].replace(" ", "_"))
    city['image'] = img_name

    # time.sleep(0.2)
    new_data.append(city)

with open("data/city_data_all_image.json", "w") as f:
    json.dump(new_data, f)