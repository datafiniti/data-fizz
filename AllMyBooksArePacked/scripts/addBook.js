const addBook = (content, individualBookWeight, currentBox) => {
  currentBox.totalWeight += individualBookWeight;
  currentBox.contents.push(content);
};

module.exports = addBook;
