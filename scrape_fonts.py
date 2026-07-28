import urllib.request
import re

url = "https://theoryza.co.in/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
except Exception as e:
    print(f"Failed to fetch {url}: {e}")
    exit(1)

css_urls = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)["\']', html)

css_content = ""
for css_url in css_urls:
    if not css_url.startswith('http'):
        css_url = url.rstrip('/') + '/' + css_url.lstrip('/')
    try:
        css_req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
        css_content += urllib.request.urlopen(css_req).read().decode('utf-8', errors='ignore') + "\n"
    except Exception as e:
        pass

# Also get inline styles
styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL)
for s in styles:
    css_content += s + "\n"

print("Google fonts in HTML:")
for link in re.findall(r'<link[^>]+href=["\'](https://fonts.googleapis.com[^"\']+)["\']', html):
    print(link)

print("\nCSS rules for h1, h2, h3, h4, h5, h6, p:")
# Simplistic regex to find blocks
# We'll just look for common font-family declarations in the entire CSS and HTML
font_families = set(re.findall(r'font-family\s*:\s*([^;\}]+)', css_content))
print("\nFound font-families:")
for f in font_families:
    print(f.strip())

# Print out specific font rules for heading and paragraph classes
import textwrap

for tag in ['h1', 'h2', 'h3', 'p', '\.heading', '\.section-title', 'body']:
    pattern = r'(' + tag + r'(?:\.[a-zA-Z0-9_-]+)?)\s*\{([^}]+)\}'
    matches = re.findall(pattern, css_content)
    for selector, block in matches:
        if 'font' in block or 'line-height' in block or 'letter-spacing' in block:
            print(f"{selector} {{")
            for line in block.split(';'):
                if any(x in line for x in ['font', 'line-height', 'letter-spacing', 'text-transform']):
                    print(f"  {line.strip()};")
            print("}")
