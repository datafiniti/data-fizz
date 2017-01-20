const dataReader = ()=> {
  const Promise = require("bluebird");
  const dataScraper = require('../dataScraper/dataScraper');
  const path = require('path');
  const fileDirectory = path.join(__dirname, '/../data/');
  const fs = require('fs');
  let html = '';
  let htmlArray = [];

return Promise.try(()=>{
  // reads the files in a directory and returns the name of the files as an array
  fs.readdir(fileDirectory, 'utf-8', (err, dirData) =>{

    if (err) throw err;
    // for each element of the array fead its contents
    dirData.forEach((fileName)=>{
      // reads the contents of the file and returns the result to the variable contents
      html = fs.readFileSync(fileDirectory + fileName, 'utf8');
      htmlArray.push(html);
    });
    // tells us the files were read successfully
    console.log('Files Read');
    console.log(htmlArray)
    // calls data scraping function and sends the extracted html array
  });
})
}


module.exports = dataReader;