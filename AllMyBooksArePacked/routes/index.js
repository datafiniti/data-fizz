var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {	

	//  contents constructor
	function content(title, author, price, weight, isbn_10){
	    this.title = title;
	    this.author = author;
	    this.price = price;
	    this.weight = weight;
	    this.isbn_10 = isbn_10;
	}

	//  box constructor
	function Box(id, totalWeight, contents){
		this.box = new boxContents(id, totalWeight, contents);
	}

	// box content constructor
	function boxContents(id, totalWeight, contents){
		this.id = id;
		this.totalWeight = Math.round(totalWeight * 100) / 100;
		this.contents = contents;
	}


	function startWebScraping(){
		// counter to keep track of book and if it has been scraped
		var i = 0;

		var library = [];

		function getHTML(i){
			
			var counter = 0;

			if(i<=20){
				fs.readFile('./data/book'+ i +'.html',function(err, data){
					if(err) {
						console.log('ERROR', err);
					}else{

						var $ = cheerio.load(data.toString());

						// initialize Title, Author, Price, Shipping, Weight, ISBN-10 
						var title, author, price, weight, isbn_10;

						// Extracting data
						function getAuthor(){
							counter++;
							$('span[id=btAsinTitle]').filter(function(){
								// extract author
								author = $(this)[0].children[0].data.trim();
								// extract title
							});
						}

						function getTitle(){
							counter++;
							$('span[id=btAsinTitle]').filter(function(){
								// extract author
								title = $(this)[0].parent.parent.children[3].children[1].children[0].data.trim();
								// extract title
							});
						}

						function getPrice(){
							counter++;
							$('span[class=bb_price]').filter(function(){
								// extract price
								price = $(this)[0].children[0].data.trim();
								// shipping weight and ISBN-10
							});
						}

						function getWeight(){
							counter++;
							$('b').filter(function(){
								var stuff = $(this);
								if(stuff.text() == "Shipping Weight:"){
									// extract weight
									var str = $(this)[0].next.data.trim();
									var WeightArr = str.split(" ");
								  weight = WeightArr[0] + " " + WeightArr[1];
								}
							});
						}

						function getISBN_10(){
							counter++;
							$('b').filter(function(){
								var stuff = $(this);
								if(stuff.text() == "ISBN-10:"){
									isbn_10 = $(this)[0].next.data.trim();
								}
							});
						}

						function done() {
							// console.log(library);
						}

						function getContents(){
							getTitle();
							getAuthor();
							getPrice();
							getWeight();
							getISBN_10();
							if(counter == 5){
								library.push(new content(title, author, price, weight, isbn_10));
								counter = 0;
								getHTML(i+1);
							}
						}

						getContents();
					}
				});
			}else{
				// arrange();
				arrange(library);
			}
		}

		getHTML(1);
	}

	function arrange(library){

		var boxArray = [];
		var contents = [];
		var shippingCrate = [];
		var id = 1;
		var boxEmptyArray = [];

		startArranging(mergeSort(library));
	
		// merge sort for best fit decreasing

		function mergeSort(arr){
		    if(arr.length < 2){
		        return arr;
		    }
		    var middle = parseInt(arr.length/2);
		    var left   = arr.slice(0, middle);
		    var right  = arr.slice(middle, arr.length);
		    
		    return merge(mergeSort(left), mergeSort(right));
		}

		function merge(left,right){
		    var result = [];
		 
		    while (left.length && right.length) {
		        if (parseFloat(left[0].weight.split(" ")[0]) >= parseFloat(right[0].weight.split(" ")[0])) {
		            result.push(left.shift());
		        } else {
		            result.push(right.shift());
		        }
		    }
		 
		    while (left.length){
		        result.push(left.shift());
		 	}

		    while (right.length){
		        result.push(right.shift());
		 	}

		    return result;
		}

		
		function startArranging(library){
			var array = library;
			var contents = [];
			var sumArray = [];
			var j=0;
			var counter = 0;

			for(var i=0;i<array.length;i++){
				var weight = parseFloat(array[i].weight.split(" ")[0].trim());

		    if(i===0){
		        contents[j] = [];
		        contents[j].push(array[i]);
		        sumArray[j] = weight;
		    }else if(weight>(10-sumArray[j])){
		        for(var k=0;k<=sumArray.length; k++){
		            if(weight <= (10-sumArray[k])){
		                contents[k].push(array[i]);
		                sumArray[k] += weight;
		                break;
		            }else if(k==sumArray.length){
		                j++;
		                contents[j] = [];
		                contents[j].push(array[i]);
		                sumArray[j] = weight;
		                break;
		            }
		        }
		    }else if(weight===(10-sumArray[j])){
		        contents[j].push(array[i]);
		        sumArray[j] += weight;
		    }else if(weight<(10-sumArray[j])){
		        contents[j].push(array[i]);
		        sumArray[j] += weight;
		    }

		    if(i==array.length-1){
		    	showResults(contents,sumArray);
		    }
			}
		}

		function showResults(contents,sumArray){
			for(var i=0;i<contents.length;i++){
				shippingCrate.push(new Box(i+12,sumArray[i],contents[i]));
			}
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(shippingCrate));
		}
	}

	startWebScraping();
	
});

module.exports = router;
