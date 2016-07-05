import re


def weight_extractor(soup):
    weight_regex = '.*(\d+\.?\d+) pounds.*'
    ship_weight_locator = soup.find('b', text=re.compile('Shipping Weight'))
    ship_weight = ship_weight_locator.parent.text.split(':')[1]
    ship_weight = re.match(weight_regex, ship_weight)
    return float(ship_weight.group(1))


def title_extractor(soup):
    # Extract the title
    title = soup.find('span', {"id": "btAsinTitle"})
    return title.text


def author_extractor(soup):
    author_locator = soup.find("span", {"class": "byLinePipe"})
    author = author_locator.parent
    return author.a.text


def price_extractor(soup):
    try:
        price = soup.find('b', {"class": "priceLarge"})
        return price.text
    except:
        price = soup.find('span', {'class': 'rentPrice'})
        return price.text


def isbn_extractor(soup):
    isbn = soup.find('b', text=re.compile('ISBN-10'))
    return isbn.parent.text.split(':')[1].strip()