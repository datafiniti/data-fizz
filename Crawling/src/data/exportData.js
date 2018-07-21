const fs = require('fs');
const dataConfig = require('./dataConfig');


//saves our file as
const exportData = () => {
  fs.writeFileSync('./amazonBookData.json', JSON.stringify(dataConfig.bookData, null, 4), (err) => {
    if (err) {
      console.error(err);
      return;
    }

  });
  console.log('Data has been saved in amazonBookData.json');
  return process.exit();
};

module.exports = exportData;
