exports.findURL = function(main_address, lineup, search1, search2){
    var cookies;
    var coffee = lineup.match(search1);
    var validUrl = require('valid-url');
    if(coffee){
        var tea = [];
        for(var i = 0; i<coffee.length; i++){
            var cappuccino = coffee[i].match(search2);
            if(cappuccino){
                tea.push(cappuccino[1]);
            }
        }
        cookies = [];
        for(var i = 0; i<tea.length; i++){
            var suspect = tea[i];
            var target = main_address+suspect;
            if (validUrl.isUri(target)){
                cookies.push(target);
            }
        }
    } else {
        console.log("No matches!");
    }
    return cookies;
};

multi_regex = function(string, regex_set){
    var str_match;
    for(var i = 0; i<regex_set.length; i++){
        match = string.match(regex_set[i]);
        if(match){
            return match;
        }
    }
    return str_match;
};
//not really worth it- doesn't act the way I intend, but I kept it around just in case
multi_multi_regex = function(string, reg_arr){
    //console.log(string);
    var set  = [];
    for(var i = 0; i<reg_arr.size; i++){
        var temp = multi_regex(string, reg_arr[i]);
        if(temp){set[i] = temp[1];}
    }
    return set;
};

exports.getinfo = function(string, source, count){
    var Product = require('./pre_struct');
    var test1 = new Product();
    var id = count;
    var regex_array = [
        [
            /<span id="productTitle" class="a-size-large">([^<]+)<\/span>/, 
            /<meta name="title" content="([^":]+:[^":]+)/
        ],
        [
            /<div class="a-fixed-right-grid-col a-col-left" style="padding-right:2\.5%;float:left;">\s*<span class="a-size-small a-color-price">\s*(\$[\d]+\.[\d]+)\s*<\/span>\s*<\/div>\s*<div class="a-fixed-right-grid-col a-col-right" style="width:50px;margin-right:-50px;float:left;">/,
            /<div class="a-fixed-right-grid-col a-col-left" style="padding-right:2\.5%;float:left;">\s*<a class="a-link-normal" href="[^"]+">\s*<span class="a-size-small a-color-price">\s*(\$[\d]+\.[\d]+)\s*<\/span>\s*<\/div>\s*<div class="a-fixed-right-grid-col a-col-right" style="width:50px;margin-right:-50px;float:left;">/
        ],
        [
            /<li><b>\s+Product Dimensions:\s+<\/b>\s+(.+)\s+<\/li>/,
            /<li><b>\s+Package Dimensions:\s+<\/b>\s+(.+)\s+<\/li>/
        ],
        /imageGalleryData' : \[({"mainUrl":"[^"]+","dimensions":\[[^\]]+\],"thumbUrl":"[^"]+"},)*({"mainUrl":"[^"]+","dimensions":\[[^\]]+\],"thumbUrl":"[^"]+"})\]/,
        [
            /<li><b>Shipping Weight:<\/b>\s+([\d]+[\.]?[\d]{0,2} \w+)/,
            /<li><b>Package Weight:<\/b>\s+([\d]+[\.]?[\d]{0,2} \w+)/
        ],
        [
            /<noscript>\s*<div>\s*<p>(.+)<\/div>/,//I gave up trying to add stuff
            /<meta name="description" content="([^"]+)"\s+\/>/
        ]
    ]; 
    if(string){
        var set = [id];
        set[0] = id;
        //Apparently multi_multi_regex isn't playing along. I'll work on that another time.
        set[1] = multi_regex(string, regex_array[0]);
        if(set[1]){set[1] = set[1][1];}
        set[2] = multi_regex(string, regex_array[1]);
        if(set[2]){set[2] = set[2][1];}
        set[3] = multi_regex(string, regex_array[2]);
        if(set[3]){set[3] = set[3][1];}
        set[4] = string.match(regex_array[3]);
        set[5] = multi_regex(string, regex_array[4]);
        if(set[5]){set[5] = set[5][1];}
        set[6] = source;
        set[7] = multi_regex(string, regex_array[5]);
        if(set[7]){
            var formatter = require('./format_results');
            set[7] = formatter.format_description(set[7][1]);
        }
        var gallery = set[4];
        if(gallery){
            var imageset = gallery[0].match(/\{"mainUrl":"([^"]+)","dimensions":\[[^\]]+\],"thumbUrl"/g);
            if(imageset){
                for(var i = 0; i<imageset.length; i++){
                    imageset[i] = imageset[i].match(/\{"mainUrl":"([^"]+)","dimensions":\[[^\]]+\],"thumbUrl"/)[1];
                }
                set[4] = imageset;
            }
        } else {
            var dynamic = string.match(/data-a-dynamic-image="{&quot;([^&]+)&quot;/);
            if(dynamic){
                set[4] = dynamic[1];
            }
        }
        test1.set_all(set);
        //console.log(JSON.stringify(test1, undefined, 2));
        return test1;
    }
    else{
        console.log('No input.');
    }
}