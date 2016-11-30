# Book Packer

For my book packing implementation, I used four different self-created ADT's: Extractor, Packer, Box, and Book.  I extended the Extractor base class by adding an AmazonBookExtractor subclass that holds the HTML parsers.  The AmazonBookExtractor parses the HTML for relavant information and then stores a created Book object.  The Extractor reads all files in the data directory and extracts asynchronously.  

Once the promise is returned, then you can pack the extracted books using the Packer object. The Packer object uses a first fit algorithm with a descending by weight dataset and a hashmap to improve lookup time.

Book packer 
## Installation

To install the Book Packer application, clone and extract the repository to a local directory.
Run command "npm install" in extracted directory.

## Usage

### To run tests:
Run ```npm test```

### To run main:
Run ```npm start```

