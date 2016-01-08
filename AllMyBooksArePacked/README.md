# Datafiniti Programming Challenge

## Description

This application uses webscraping to parse information from amazon's webpages on books to make a json document with book data(title,author,ISBN,etc). 

## How it works
	
### There are three main steps
### Getting the html
The application uses the **fs** and **request** modules to get html from web pages. The **fs** module is used to get html from files in a local folder while the **request** module used for urls.
### Getting the data 
To get data from html, we need to access data within tags in the html. The **cheerio** module, an implementation of JQuery specifically designed for the server, helps to do so.
### Making the JSON
Once steps 1 and 2 are completed, the data from the html needs to be converted to JSON. This makes the data convenient and accessible. We must first place the data into objects which we do with the help of object constructors. Then we can convert the objects to JSON forma
	
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
* Express: http://expressjs.com

