const request = require('request');
const cheerio = require('cheerio');
const he = require('he');
const randomUA = require('random-fake-useragent');
const fs = require('fs');

const baseUrl = 'https://www.amazon.com';

const getUA = () => {
  var ua = randomUA.getRandom();
  return ua
}

const customRequest = request.defaults({
	headers: {'User-Agent': getUA()}
})


const getDepartmentUrl = (url, callback) => {
  customRequest(url, function(error, response, body) {
    if (error) {
      console.log(error)
    }
    let $ = cheerio.load(body);
    let urls = baseUrl + $('a');

		$(urls).each(function() {
        if ($(this).text() === "Departments") {
          let url = baseUrl + $(this).attr('href')
          callback(null, url)
        }
    })
  })
}

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

const getBookUrls = (url, callback) => {
  setTimeout(customRequest, 15000, url, function(error, response, body) {
    if (error) {
      console.log(error)
    }
    let $ = cheerio.load(body);
    let bookUrls = []
    let links = ($('a.aok-block.aok-nowrap.aok-hide-text.acs_product-image')).slice(0, 30);

    $(links).each(function(index, value) {
      bookUrls.push(baseUrl + $(value).attr('href'));
    })

    callback(null, bookUrls)
  })
}

const getBookInfo = (url, callback) => {
  setTimeout(customRequest, 15000, url, function(error, response, body) {
    if (error) {
      console.log(error)
    }
    let $ = cheerio.load(body);

    let name = $('#productTitle').text() || null;
    let listPrice = $('#boxNewInner, span.a-color-secondary.a-text-strike').text() || undefined;
    let description = ($('#bookDescription_feature_div, #iframeContent').text()).replace(/(<[^>]+>|\n|\t|  )/g, '') || undefined;

		if (description) {
			var formattedDescription = he.decode(description)
		}

    let dimensions = ($("li:contains('Product Dimensions:')").text()).replace(/([^0-9x]|\n| )/g, '') || undefined;
    let imageUrls = '';
		var jsonString = $('#imgBlkFront').attr('data-a-dynamic-image')
		if (jsonString !== undefined) {
			imageUrls = Object.keys(JSON.parse(jsonString))
		} else {
			imageUrls = undefined
		}

    let weight = ($("li:contains('Shipping Weight:')").text()).replace(/[a-zA-Z(): ]/g, '') || undefined;
    let sourceUrl = url.substring(0, 44);

		if (name) {
	    var product = {
				book: {
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
			var product = null
		}

		if (product){
	    var json = JSON.stringify(product, null, 2)

	    callback(null, json)
		} else {
			callback(null, product)
		}
  })
}

const main = () => {
  getDepartmentUrl(baseUrl, function(error, departmentUrl) {
    console.log('Department url: ', departmentUrl)
    getCategoryUrl(departmentUrl, function(error, categoryUrl) {
      console.log('Category url: ', categoryUrl)
			getBookPageUrl(categoryUrl, function (error, bookPageUrl) {
				console.log('Book Page Url: ', bookPageUrl)
	      getBookUrls(bookPageUrl, function(error, bookUrls) {
	        console.log('Book urls:', bookUrls)

					for (var i = 0; i < bookUrls.length; i++) {
						getBookInfo(bookUrls[i], function(error, bookDetails) {
							if (bookDetails) {
								let rawdata = fs.readFileSync('results.json');
								if (rawdata) {
									console.log('Current', rawdata)
								}
								let newJson = rawdata + bookDetails
								fs.writeFileSync('results.json', newJson);

								console.log('Book details: ', JSON.parse(bookDetails))
							}
							return;
						})
					}
	      })
			})
		})
  })
}

main();
