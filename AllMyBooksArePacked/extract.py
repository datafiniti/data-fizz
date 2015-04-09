from bs4 import BeautifulSoup

parsed_html = BeautifulSoup(open('data/book16.html'), 'html.parser')

def find_title_author(parsed_html):
    return parsed_html.find('span', attrs={'id':'btAsinTitle'}).parent.parent

title_author = find_title_author(parsed_html)

title = title_author.h1.span
print title.text
