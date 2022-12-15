import sys

def print_color_url(url, file=sys.stderr):
    print(f"\033[32m{url}\033[0m", file=file)

def parse_float(s: str):
    try:
        ret = float(s)
        return ret
    except ValueError:
        return None

def parse_int(s: str):
    try:
        ret = int(s)
        return ret
    except ValueError:
        return None