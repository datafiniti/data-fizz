const util = require('util');
    scraper = function(baseweb, webtoo, filters, count){
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", webtoo);
        xhttp.responseType = "document";
        xhttp.send();
        xhttp.onload = function () {
            if (xhttp.readyState === xhttp.DONE) {
                if (xhttp.status === 200) {
                    var parser = require('./parse_functions');
                    var formatter = require('./format_results');
                    var temp = xhttp.responseText;
                    var result = parser.findURL(formatter.strip_web(baseweb), temp, filters[count][0], filters[count][1]);
                    if(!result | result === undefined){
                        console.log('Could not scrape site. Aborting.');
                        //console.log(temp);//to show where the error is. This is almost certainly the Amazon anti-robot code, listed in results_1.txt.
                        return;
                    }
                    if(count == 0){
                        console.log('Site scraped. Converting to JSON.');
                        console.log('Formatting websites...');
                        result = formatter.format_websites(result);
                        if(result){
                            //console.log(result);
                            return site_to_JSON(result, result.length, []);
                        } else {
                            console.log('Only got garbage.');
                        }
                    }
                    console.log('Continuing from ' + result);
                    return scraper(formatter.strip_web(baseweb), result, filters, count-1);
                } else {
                    console.log("Process halted, HTTP Status: "+ xhttp.status);
                }
            } else {
                console.log("Process halted, call incomplete.");
            }
        };
    };

    site_to_JSON = function(baseweb, count, array){
        console.log(count);
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhttp = new XMLHttpRequest();
        count--;
        var formatter = require('./format_results');
        xhttp.open("GET", baseweb[count]);
        xhttp.responseType = "document";
        xhttp.send();
        xhttp.onload = function () {
            if (xhttp.readyState === xhttp.DONE) {
                if (xhttp.status === 200) {
                    var temp = xhttp.responseText;
                    var parser = require('./parse_functions');
                    var add = parser.getinfo(temp, baseweb[count], count);
                    //console.log(add);
                    array[count] = add;
                    if(count == 0){
                        console.log('Formatting products...');
                        formatter.format_products(array);
                        return;
                    }else{
                        return site_to_JSON(baseweb, count, array);
                    }
                } else {//both emergencies
                    console.log('Formatting what products we could get...');
                        formatter.format_products(array);
                        return;
                }
            } else {
                console.log('Formatting what products we could get...');
                    formatter.format_products(array);
                    return;
            }
        };
    };
partmain = function(){
    var array = [
        "https://www.amazon.com/gp/product/0374360979",
        "https://www.amazon.com/gp/product/B01M14UN1J",
        "https://www.amazon.com/gp/product/B01FPGY5T0",
        "https://www.amazon.com/gp/product/B078M5G7XH",
        "https://www.amazon.com/gp/product/B07C75GRLY",
        "https://www.amazon.com/gp/product/1492656224",
        "https://www.amazon.com/gp/product/B00H25FCSQ",
        "https://www.amazon.com/gp/product/B075RV48W3",
        "https://www.amazon.com/gp/product/0399226907",
        "https://www.amazon.com/gp/product/0312510780",
        "https://www.amazon.com/gp/product/0756634687",
        "https://www.amazon.com/gp/product/149267043X",
        "https://www.amazon.com/gp/product/0545162076",
        "https://www.amazon.com/gp/product/1442450703",
        "https://www.amazon.com/gp/product/0374360979",
        "https://www.amazon.com/gp/product/1492656224"
    ];
    console.log("TEST");
    var formatter = require('./format_results');
    var result = formatter.format_websites(array);
    //console.log(result);
    return site_to_JSON(result, result.length, []);
}
main = function(){
    var baseweb = process.argv[2];
    var filterarray;
    switch(process.argv[3]){
        case 'books':
            var narrow_down = /"[^"]+","url":"[^"]+"/g;
            var search_for_booksite= /"Books","url":"([^"]+)"/;
            var search_titles = /<a class="a-link-normal" title="[^"]+" href="[^"]+"/g;
            var any =  /<a class="a-link-normal" title="[^"]+" href="([^"]+)"/;
            filterarray = [[search_titles, any], [narrow_down, search_for_booksite]];
            break;
        default:
            console.log('No search target.');
            return;
    }
    if(!baseweb | !filterarray){
        console.log('Invalid arguments.');
        return;
    }
    console.log('Arguments ' + process.argv[2] + ' and ' + process.argv[3] + ' accepted.');
    console.log('Searching ' + process.argv[2] + ' for ' + filterarray);
    scraper(baseweb, baseweb, filterarray, filterarray.length-1);
}
/*part*/main();//uncomment for easier testing. Apparently the initial crawl is a huge pain because Amazon immediately recognizes it and tries to stop it