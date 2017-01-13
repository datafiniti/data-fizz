// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;
// Create book schema that is representation of what the document looks like
var BookSchema = new Schema({
  // title of the book and is a required string
  title: {
    type: String,
    required: true
  },
  // author of the book and is a required string
  author: {
    type: String,
    required: true
  },
  // price of the book and is a required string
    price: {
    type: String,
    required: true
  },
  // weight of the book and is a required number
    shipping_weight: {
    type: Number,
    required: true
  },
  // isbn number of the book and is a required string
    "isbn-10": {
    type: String,
    required: true,
    unique: true,
    dropDubs: true
  }
});

// Create the Book model with the BookSchema
var Book = mongoose.model("Book", BookSchema);

// Export the model
module.exports = Book;
