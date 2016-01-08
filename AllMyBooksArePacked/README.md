# Datafiniti Programming Challenge

## Description

This application uses webscraping to parse information from amazon's webpages on books to make a json document with book data(title,author,ISBN,etc). 

## How it works
	
### There are three main steps
### Getting the html
	The application uses two modules, **fs** and **request** to get html from web pages. The **fs** module is used to get html from files on the  
### Getting the data 
 	Getting the data involves actually extracting the data. The **cheerio** module, an implementation of JQuery specifically designed for the server, helps in getting information from the html tags.
### Making the JSON
 	Once steps 1 and 2 are completed, the information needs to be placed in json documents. This involves creating constructors to hold the data(book data in this case).
	
## Sample code

```json
[
	{
		"id":1,
		"totalWeight":9.4,
		"contents":[
			{
				"title":"Neil Gaiman",
				"author":"The Ocean at the End of the Lane: A Novel",
				"price":"$15.22",
				"weight":"9.4 pounds","isbn_10":"0062255657"
			}
		]
	},

	[...]
]
```

## Libraries 
* Cheerio: https://github.com/cheeriojs/cheerio
* Request: https://github.com/request/request

