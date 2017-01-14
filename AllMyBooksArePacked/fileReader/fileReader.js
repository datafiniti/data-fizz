
var fileReader = function(){
  const path = '../data/';
  const fs = require('fs');
  let contents = [];
  // reads the files in a directory and returns the name of the files as an array
  fs.readdir(path, 'utf-8', function (err, dirData) {
    if (err) throw err;
    // for each element of the array fead its contents
    dirData.forEach(function(fileName){
      // reads the contents of the file and returns the result to the variable contents
      contents = fs.readFileSync(path + fileName, 'utf8');

    });
  });

}

var logResult = function(contents){
  console.log(contents);
      console.log('\n\n');
}

fileReader();

module.exports = fileReader;