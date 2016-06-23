var bookPacker = require('./bookPacker');

console.time('Execution took');

/* Models the DOM, extracts the data, and writes to JSON file */
bookPacker.getFileNames('data')
  .then(bookPacker.generateHtmlPromises)
  .then(bookPacker.generateResultsJson)
  .then(function() {
    console.timeEnd('Execution took');
  });
