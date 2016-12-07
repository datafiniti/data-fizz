var domain = require('./domain')
var par = require('./parser');
var fs = require('fs');
var argv = require('yargs')
    .usage('Usage: .\main.js --dir=[path_to_dir] -url=[url_to_scrap] --output=[file] --showperf')
    .argv;

(function() {
    var start = process.hrtime();

    if (argv.dir) {
        //follow local parse logic
        var path = argv.dir;
        console.log("Parsing the following directory: " + path);
        var parser = new par();
        parser['isLocal'] = true;
        var files = fs.readdirSync(path);
        var handler = new domain.Handler();
        files.forEach(function (item, i) {
            parser['path'] = path + item;
            parser.parsePath();
            handler.fillProductList(parser.pseudoProduct);
        });

        handler.fillBoxLargestToSmallest();
        output();
        
    }else if(argv.url){
        // not implemented (outside of scope). 
        // use the Requests package to gather the url and any routes.
        // then implement the same logic from the AmazonParser object.
    }

    if (argv.showperf) {
        var end = process.hrtime(start);
        console.log("Execution time: %ds %dms", end[0], end[1] / 1000000);
    }

    function output() {
        if (argv.output) {
            var outFile = argv.output;
            fs.writeFile(outFile,JSON.stringify(handler.boxes,null,4));
        }
        else {
            console.log(JSON.stringify(handler.boxes,null,4));
        }
    }
})();




