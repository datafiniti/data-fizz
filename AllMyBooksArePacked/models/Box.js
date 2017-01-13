// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;
// Create box schema that is representation of what the document looks like
var BoxSchema = new Schema({
  // total weight represents the total of the individual weight of its contents and is a required number
  totalWeight: {
    type: Number,
    required: true
  },
  // This only saves one ObjectId, ref refers to the Book model. use [{}] for multiple.
  // This key takes in an ObjectId from Book and a populate method is called during the query to retrieve the necessary data.
  contents: [{
    type: Schema.Types.ObjectId,
    ref: "Book"
  }]
});

// Create the Box model with the BoxSchema
var Box = mongoose.model("Box", BoxSchema);

// Export the model
module.exports = Box;
