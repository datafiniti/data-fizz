# Datafiniti Programming Challenge

## Description

This application uses webscraping to parse information from amazon's webpages on books to make a json document with book data(title,author,ISBN,etc). 

## How it works
	
### There are three main steps

* Getting the html
* Getting the data
* Making the JSON

## Sample code

```json
[
	{
		id: 1,
		totalWeight: 9.4,
		contents: [
			{
			title: "Neil Gaiman",
			author: "The Ocean at the End of the Lane: A Novel",
			price: "$15.22",
			weight: "9.4 pounds",
			isbn_10: "0062255657"
			}
		]
	}, 
	[...]
]
```

## Libraries 
* Cheerio: https://github.com/cheeriojs/cheerio
* Request: https://github.com/request/request

