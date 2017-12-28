'use strict';
const fs = require('fs');
const Parser = require('./src/parser');

const files = fs.readdirSync(`${__dirname}/src/data`);
files.forEach((file) => {
    fs.readFile(`./src/data/${file}`, function (err, html) 
    {
        if (err)
        {
            throw err;
        }
        const $html = html.toString();
        const parsedHtml = Parser.parseHtml($html);
    })
});
