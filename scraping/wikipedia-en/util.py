import sys

def print_color_url(url, file=sys.stderr):
    print(f"\033[32m{url}\033[0m", file=file)

