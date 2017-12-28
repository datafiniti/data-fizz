'use strict';
const fs = require('fs');
const jsonfile = require('jsonfile')

const Parser = require('./src/parser');
const Packer = require('./src/packer');

const readHtmls = () => {
    const books = [];
    const files = fs.readdirSync(`${__dirname}/src/data`);
    files.forEach((file) => {
        const html = fs.readFileSync(`./src/data/${file}`);
        const book = Parser.parseHtml(html.toString());
        books.push(book);
    });
    return books;
};
const createFile = (boxes) => {
    jsonfile.writeFileSync('boxes.json', boxes, {spaces: 4});
};

const run = () => {
    const books = readHtmls();
    const boxes = Packer.packBooksInBoxes(books);
    createFile(boxes);
};

run();