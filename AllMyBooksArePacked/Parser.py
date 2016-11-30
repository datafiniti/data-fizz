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
soup = BeautifulSoup(open("data/book1.html"), "html.parser")

#*********************************************************************
# Title location
#*********************************************************************
titleContainer = soup.find(id="btAsinTitle")
title = titleContainer.contents[0]
print(title);

#*********************************************************************
# Author location
#*********************************************************************
authorContainer = titleContainer.parent.parent
author = authorContainer.find('a').text
print(author)

#*********************************************************************
# ISBN location 
#*********************************************************************
isbnContainer = soup.find(id="ASIN")
isbn = isbnContainer['value']
print(isbn)

#**********************************************************************
# Shipping weight location 
#**********************************************************************
weightSibling = soup.find('b', string='Shipping Weight:')
weightContainer = weightSibling.parent
weight = weightContainer.contents[1]

#weight always has form " x.x pounds (" we need to clean it up
weight = weight[1:-2]									
print (weight)

#*********************************************************************
# Price location 
#*********************************************************************
priceContainer = soup.find(id="actualPriceContent")
price = priceContainer.contents[0].text
print(price)





