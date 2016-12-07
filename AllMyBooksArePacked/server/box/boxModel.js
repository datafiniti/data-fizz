'use strict';

var _ = require('lodash');
var sanitizer = require('auto-sanitize').sanitizeObject;

var properties = [ 'id', 'totalWeight', 'contents'];

var Create = args => {
    args = args || {};
    
    var box = {};

    var proLength = properties.length;
    
    for(var i = 0; i < proLength; i += 1) 
    { 
        if (args[properties[i]] !== undefined) 
        {
            box[properties[i]] = args[properties[i]];
        }
    }
    
    box = sanitizer(box);
    
    if(hasValidData(box)) 
    {
        return box;
    }
};

var hasValidData = box => {

    if(box.contents) 
    {
        if(!_.isArray(box.contents)) 
        {
            throw new Error('The box contents is invalid');
        }
    }
    
    return true;
};

module.exports.Create = Create;