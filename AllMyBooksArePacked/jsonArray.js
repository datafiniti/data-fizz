var fs = require('fs');

exports.jsonFilesToArray = function(dir) {
    var jsonArr = [];
    fs.readdirSync(dir).forEach(function(file) {
        var json = JSON.parse(fs.readFileSync(dir + file, 'utf8'));
        jsonArr.push(json);
    });
    return jsonArr;
}

exports.sortJsonArrayPrice = function(arr, sortBy, reverse) {
    arr.sort(function(a, b) {
        return parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
    });
    return (reverse) ? arr.reverse() : arr;
};