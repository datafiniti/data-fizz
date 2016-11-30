#Robbie Zuazua
#Last Modified: 11/29/16

#**********************************************************
# We will use 
# 1) BeautifulSoup Python Library
#**********************************************************

from bs4 import BeautifulSoup


#*********************************************************************
# Testing: open single document 
#*********************************************************************
soup = BeautifulSoup(open("data/book19.html"), "html.parser")

#*********************************************************************
# Title location: id="btAsinTitle"<..title..>
#*********************************************************************
titleContainer = soup.find(id="btAsinTitle")
title = titleContainer.contents[0]
print(title);

#*********************************************************************
# Author location: inside div that contains title and author
#*********************************************************************
authorContainer = titleContainer.parent.parent
author = authorContainer.find('a').text
print(author)


#*********************************************************************
# ISBN location : id="ASIN" value="..isbn.."
#*********************************************************************
isbnContainer = soup.find(id="ASIN")
isbn = isbnContainer['value']
print(isbn)


#*********************************************************************
# Shipping weight location : li><b>Shipping Weight:</b> ..weight..
#*********************************************************************
weightSibling = soup.find('b', string='Shipping Weight:')
weightContainer = weightSibling.parent
weight = weightContainer.contents[1]

#weight always has form " x.x pounds (" we need to clean it up
weight = weight[1:-2]									
print (weight)


