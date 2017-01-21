const Box = require("../models/Box");

const boxMaker = (arrayOfPackedBoxes, cb)=>{
    Box.insertMany(arrayOfPackedBoxes, (err, result)=> {
        cb(err, result);
        console.log("Packed boxes stored");
    });
}

module.exports = boxMaker;
