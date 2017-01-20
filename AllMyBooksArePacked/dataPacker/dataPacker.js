const dataPacker = (arrayOfPackedBoxes)=>{
const Box = require("../models/Box");
// throw new Error('');
    arrayOfPackedBoxes.forEach((packedBox)=>{
        // Using our Box model, create a new packedBox
        // This effectively passes the result object to the entry
        let entry = new Box(packedBox);

        // Now, save the entry to the db
        entry.save(function(err, doc) {
        // throw any errors
            if (err) throw err;
        });
    });
    console.log("Packed boxes stored");
}

module.exports = dataPacker;
