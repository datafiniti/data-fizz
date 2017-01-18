const dataPacker = (package)=>{}
    // Using our Book model, create a new entry
    // This effectively passes the result object to the entry
    let entry = new Box();

    // Now, save that entry to the db
    entry.save(function(err, doc) {
    // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
          count++
        }
        console.log("Model Created");
    });
    if (count < resultArray.length) {

    } else {
        sortByWeightDecending();
    }
});
