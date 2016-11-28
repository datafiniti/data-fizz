#Robbie Zuazua
#Last Modified: 11/27/16

#**********************************************************
# We will use 
# 1) BeautifulSoup Python Library
# 2)regex library 
#**********************************************************

import re
from bs4 import BeautifulSoup


#*********************************************************************
# Testing: open single document 
#*********************************************************************

soup = BeautifulSoup(open("data/book1.html"), "html.parser")

#*********************************************************************
# Observation: title and Author always contained in meta:description
#*********************************************************************
titleAndAuthor = soup.find("meta", {"name":"description"}).get('content')

#*********************************************************************
# This regex assumes no bracket in title - problem??
#*********************************************************************
title = re.search('.+?(?=\[)', titleAndAuthor, flags=0) 

#*********************************************************************
# This regex assumes no bracket in title - problem??
#*********************************************************************
author = re.search('(?<=\[).+?(?=\])', titleAndAuthor, flags=0) 



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
print(title.group().encode('utf-8'))
print(author.group().encode('utf-8'))

