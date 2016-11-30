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
# isbn enclosed : <li><b></b>isbn here</li>
#*********************************************************************
for node in soup.findAll("li"):
        for node2 in node.find_all('b', string='ISBN-10:'):
                isbn = node2.parent.text
                isbn = isbn[9:19]

#*********************************************************************
# print statements to test outputs
#*********************************************************************
print(isbn)

