const dataScraper = require('../dataScraper/dataScraper');

const dataReader = ()=> {
  const path = process.env.HOME + '/Desktop/Bootcamp/Assignments/DataFizz/AllMyBooksArePacked/data/';
  const fs = require('fs');
  let html = '';
  // reads the files in a directory and returns the name of the files as an array
  fs.readdir(path, 'utf-8', (err, dirData) =>{
      console.log(path);
    if (err) throw err;
    // for each element of the array fead its contents
    console.log(dirData);
    dirData.map((fileName)=>{
      // reads the contents of the file and returns the result to the variable contents
      html = fs.readFileSync(path + fileName, 'utf8');
      console.log('File Read');
      dataScraper(html);
    });
  // tells us the files were read successfully
  });
}

module.exports = dataReader;