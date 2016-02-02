# Datafiniti Programming Challenge

## Usage
* Change directory to AllMyBooksArePacked
```cd AllMyBooksArePacked```
* Install all the dependencies
```npm install```
* Run the application using
```npm start```

## Description
This application uses webscraping to get data from books on amazon's webpage. Currently, it parses through the html files in the data directory. It also arranges books based on weights into the least number of boxes with 10lb max capacity. The application returns the array of boxes in json format.

## How it works
	
### There are three main steps

#### Getting the html
The application uses the **fs** module to get html from web pages. The **fs** module used to get html from files in a local folder can be augmented with the **request** module to get html from url's.
#### Extracting the data 
To extract data from html, we need to pull out information from between tags in the html. The **cheerio** module, an implementation of JQuery specifically designed for the server, is used for this purpose.
#### Making the JSON
Once we get the data, it needs to be converted to JSON. The application uses object constructors to build objects that store book data and then converts the objects to JSON.

#### Additional Step
This application also places the books into the least number of boxes. It does so using a technique called next fit decreasing. The algorithm works by arranging the books by first arranging books nonincreasingly and then placing books into new boxes when the book can't fit into any of the existing boxes. Because the algorithm has to look back every time a book doesn't fit in a box the worst time is O(n^2). There is a method using binary trees that can bring down the worst time to O(nlogn).

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
