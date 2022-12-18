import json

name_map = {
    "Tokyo": "東京都",
    "Tokyo – Adachi": "足立区",
    "Tokyo – Arakawa": "荒川区",
    "Tokyo – Bunkyō": "文京区",
    "Tokyo – Chūō": "中央区",
    "Tokyo – Edogawa": "江戸川区",
    "Tokyo – Itabashi": "板橋区",
    "Tokyo – Katsushika": "葛飾区",
    "Tokyo – Kōtō": "江東区",
    "Tokyo – Meguro": "目黒区",
    "Tokyo – Nerima": "練馬区",
    "Tokyo – Ōta": "大田区",
    "Tokyo – Setagaya": "世田谷区",
    "Tokyo – Shibuya": "渋谷区",
    "Tokyo – Shinagawa": "品川区",
    "Tokyo – Shinjuku": "新宿区",
    "Tokyo – Suginami": "杉並区",
    "Tokyo – Taitō": "台東区",
}

pref_map = {
    "Tokyo": "東京都",
    "Tokyo – Adachi": "東京都",
    "Tokyo – Arakawa": "東京都",
    "Tokyo – Bunkyō": "東京都",
    "Tokyo – Chūō": "東京都",
    "Tokyo – Edogawa": "東京都",
    "Tokyo – Itabashi": "東京都",
    "Tokyo – Katsushika": "東京都",
    "Tokyo – Kōtō": "東京都",
    "Tokyo – Meguro": "東京都",
    "Tokyo – Nerima": "東京都",
    "Tokyo – Ōta": "東京都",
    "Tokyo – Setagaya": "東京都",
    "Tokyo – Shibuya": "東京都",
    "Tokyo – Shinagawa": "東京都",
    "Tokyo – Shinjuku": "東京都",
    "Tokyo – Suginami": "東京都",
    "Tokyo – Taitō": "東京都",
}

with open("data/city_data_all.json") as f:
    data = json.load(f)

for i, city in enumerate(data):
    city_name = city['cityName'][:]
    if city_name in name_map.keys():
        city['cityName'] = name_map[city_name]
    
    for j, sister in enumerate(city['sisterCities']):
        if sister in name_map.keys():
            city['sisterCities'][j] = name_map[sister]
    
    if city_name in pref_map.keys():
        city['prefecture'] = pref_map[city_name]

with open("data/city_data_all.json", "w") as f:
    json.dump(data, f)