'use strict';

var _ = require('lodash');
var sanitizer = require('auto-sanitize').sanitizeObject;

var properties = [ 'title', 'author', 'price', 'shipping_weight', 'isbn_10'];

var Create = args => {
    args = args || {};
    
    var book = {};

    var proLength = properties.length;
    
    for(var i = 0; i < proLength; i += 1) 
    { 
        if (args[properties[i]] !== undefined) 
        {
            book[properties[i]] = args[properties[i]];
        }
    }
    
    book = sanitizer(book);
    
    if(hasValidData(book)) 
    {
        return book;
    }
};

var hasValidData = book => {

    //throw new Error('The book xxxx is invalid');
    
    return true;
};

module.exports.Create = Create;