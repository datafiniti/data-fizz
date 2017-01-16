
// const fileReader = ()=>{
//   const path = '../data/';
//   const fs = require('fs');
//   let html = '';
//   // reads the files in a directory and returns the name of the files as an array
//   fs.readdir(path, 'utf-8', (err, dirData) =>{
//     if (err) throw err;
//     // for each element of the array fead its contents
//     dirData.forEach((fileName)=>{
//       // reads the contents of the file and returns the result to the variable contents
//       html = fs.readFileSync(path + fileName, 'utf8');
//       return html
//     });
//   });
// }

// var logResult = (contents)=>{
//   console.log(contents);
//       console.log('\n\n');
// }

// module.exports = fileReader;