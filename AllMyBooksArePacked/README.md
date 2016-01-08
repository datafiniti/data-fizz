# Datafiniti Programming Challenge

## Description
This application uses webscraping to get data from books on amazon's webpage. Currently, it parses through the html files in the data directory. It also arranges the book based on weights into the least number of boxes with 10lb max capacity. The application returns the array of boxes in json format.

## How it works
	
### There are three main steps

### Getting the html
The application uses the **fs** module to get html from web pages. The **fs** module is used to get html from files in a local folder and can be augmented with the **request** module to get html from url's.
### Getting the data 
To get data from html, we need to extract data within tags in the html. The **cheerio** module, an implementation of JQuery specifically designed for the server, is used in this application.
### Making the JSON
Once we get the data, it needs to be converted to JSON. The application uses object constructors to build the objects with book data fields(title,author,etc). Then we can convert these objects to JSON format.

### Additional Step
This application also places the books into the least number of boxes. It does so using a technique called next fit decreasing. The algorithm works by arranging the books by weight nonincreasingly and then placing books into new boxes when the boxes before it are completely filled. Because the algorithm has to look back every time it adds a new box the worst time is O(n^2). There is a method using binary trees that hasn't been implemented yet that can bring the worst time to O(nlogn).

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
* Express: http://expressjs.com/
