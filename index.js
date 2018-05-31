const request = require('request');
const cheerio = require('cheerio');
const he = require('he');
const randomUA = require('random-fake-useragent');
const fs = require('fs');

const baseUrl = 'https://www.amazon.com';

//Creating a custom request with a random User-Agent from the random-fake-useragent npm package
//so that each request comes from a different UA decreasing chances of connections being refused
const customRequest = request.defaults({
	headers: {'User-Agent': randomUA.getRandom()}
})

//Passing https://www.amazon.com as our url
const getDepartmentUrl = (url, callback) => {
  //Initiating custom request with a random UA
  customRequest(url, function(error, response, body) {
    if (error) {
      console.log(error)
    }
    //Using cheerio to load the html into a variable so that we don't have to keep making
    //requests to parse through the page
    let $ = cheerio.load(body);
    //Assigns all <a> elements to variable urls
    let urls = baseUrl + $('a');

    //Maps through the urls variable until the innerText matches Departments, returns the
    //departments url via the callback function
		$(urls).each(function() {
        if ($(this).text() === "Departments") {
          let url = baseUrl + $(this).attr('href')
          callback(null, url)
        }
    })
  })
}

//Called on in the callback from getDepartmentUrl, it passes the url returned from that function
//and similarly uses it to grab the books category url. This is also where setTimeout comes into
//play, allowing some time to pass between requests so that amazon doesn't
const getCategoryUrl = (url, callback) => {
  setTimeout(customRequest, 15000, url, function(error, response, body) {
    if (error) {
      console.log(error)
    }
    let $ = cheerio.load(body);
    let links = $("a.a-link-normal.fsdLink.fsdDeptLink");

    $(links).each(function() {
        if ($(this).text() === "Books") {
          let url = baseUrl + $(this).attr('href')
          callback(null, url)
        }
    })
  })
}

//Called on in our callback from getCategoryUrl, it passes the url returned from that function
//and uses it to grab the new york times bestseller list of books url (to exclude ebooks and
//audio for the next function call)
const getBookPageUrl = (url, callback) => {
  setTimeout(customRequest, 15000, url, function(error, response, body) {
    if (error) {
      console.log(error)
    }
    let $ = cheerio.load(body);
    let links = $("a.nav-a");

    $(links).each(function() {
      if ($(this).text() === "The New York Times® Best Sellers") {
        let url = baseUrl + $(this).attr('href')
        callback(null, url)
      }
    })
  })
}

//bookPageUrl is passed into this function
const getBookUrls = (url, callback) => {
  setTimeout(customRequest, 15000, url, function(error, response, body) {
    if (error) {
      console.log(error)
    }
    let $ = cheerio.load(body);

    //Initiate an array to house our multiple book urls
    let bookUrls = []
    //Assigns elements with the presented properties, using the .slice to keep the variable a
    //manageable length
    let links = ($('a.aok-block.aok-nowrap.aok-hide-text.acs_product-image')).slice(0, 50);

    //For each element grabbed, add the href value to bookUrls array
    $(links).each(function(index, value) {
      bookUrls.push(baseUrl + $(value).attr('href'));
    })

    //Pass bookUrls array for the next function
    callback(null, bookUrls)
  })
}

//This function is called in a for loop that directly correlates to the length of our bookUrls array
//Passing in a specific book url from an index dictated by the for loop
const getBookInfo = (i, url, callback) => {
  setTimeout(customRequest, 15000, url, function(error, response, body) {
    if (error) {
      console.log(error)
    }
    let $ = cheerio.load(body);

    //Begin using jQuery to grab element's text, if there is no text the variable is assigned undefined
    let name = $('#productTitle').text() || undefined;
    let listPrice = $('#boxNewInner, span.a-color-secondary.a-text-strike').text() || undefined;

    //description is first stripped of \n, and \t
    let description = ($('#bookDescription_feature_div, #iframeContent').text()).replace(/(<[^>]+>|\n|\t|  )/g, '') || undefined;
		if (description) {
      //He npm package decodes html entities
			var formattedDescription = he.decode(description)
		}

    //Strips out every character except 0 through 9 and x
    let dimensions = ($("li:contains('Product Dimensions:')").text()).replace(/([^0-9x]|\n| )/g, '') || undefined;
    //Initiate variable for multiple urls to be housed
    let imageUrls = '';

    //Grabs the element containing the image and the attribute containing the image urls
		var jsonString = $('#imgBlkFront').attr('data-a-dynamic-image')

    //If it does not come back as undefined, Object.keys returns an array of our parsed jsonString
		if (jsonString !== undefined) {
			imageUrls = Object.keys(JSON.parse(jsonString))
		} else {
			imageUrls = undefined
		}

    let weight = ($("li:contains('Shipping Weight:')").text()).replace(/[a-zA-Z(): ]/g, '') || undefined;
    //Assign our source url as a substring of the bookUrl
    let sourceUrl = url.substring(0, 44);

    //If the name variable is defined, assign previously assigned variables as parts of the product object
		if (name) {
	    var bookDetails = {
				book: {
          id: i,
		      name: name,
		      listPrice: listPrice,
		      description: formattedDescription,
		      dimensions: dimensions,
		      imageUrls: imageUrls,
		      weight: weight,
		      sourceUrl: sourceUrl
				}
	    }
		} else {
			var bookDetails = null
		}

    //If product isn't null, stringify product and format for the final step, else we pass product as null
		if (bookDetails){
	    var json = JSON.stringify(bookDetails, null, 2)
	    callback(null, json)
		} else {
			callback(null, bookDetails)
		}
  })
}

//Main function calling all other functions
const main = () => {
  getDepartmentUrl(baseUrl, function(error, departmentUrl) {
    console.log('We have found the department url and appreciate your patience as we wait to place the category url request')
    getCategoryUrl(departmentUrl, function(error, categoryUrl) {
      console.log('We have found the category url and appreciate your patience as we wait to place the book page url request')
			getBookPageUrl(categoryUrl, function (error, bookPageUrl) {
        console.log('We have found the book page url and appreciate your patience as we wait to place the book urls request')
	      getBookUrls(bookPageUrl, function(error, bookUrls) {
          console.log(`We have found book urls and appreciate your patience as we wait to place the book's information request`)

          //The for loop dictating how many times getBookInfo is run
					for (var i = 0; i < bookUrls.length; i++) {
						getBookInfo(i, bookUrls[i], function(error, bookDetails) {
              //If getBookInfo returned bookDetails as anything but null, read the current results.js file
              //and add all new book details
							if (bookDetails) {
								let rawdata = fs.readFileSync('results.json');
								let newJson = rawdata + bookDetails
								fs.writeFileSync('results.json', newJson);
                console.log("The Book with the id of ", [i], " has been written in results.json")
							}
						})
					}
	      })
			})
		})
  })
}

main();
