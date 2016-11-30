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
# Title location: id="btAsinTitle"<..title..>
#*********************************************************************
title = soup.find(id="btAsinTitle")
print(title.contents[0]);

#*********************************************************************
# Author location: inside div that contains title and author
#*********************************************************************
authorContainer = title.parent.parent
print(authorContainer.find('a').text)


#*********************************************************************
# ISBN location : id="ASIN" value="..isbn.."
#*********************************************************************
isbn = soup.find(id="ASIN")
print(isbn['value'])
