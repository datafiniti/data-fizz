var fs = require('fs');

exports.jsonFilesToArray = function(dir) {
    return fs.readdirSync(dir).map(
        file => JSON.parse(fs.readFileSync(dir + file, 'utf8')));
}


exports.sortJsonArrayPrice = function(arr, sortBy) {
    arr.sort(function(a, b) {
        return parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
    });
    return arr.reverse();
};