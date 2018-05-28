const Box = require("../constructors/Box.js");

const createBox = (outputJSON, boxCount) => {
  outputJSON["Box" + boxCount] = new Box(boxCount);
  const currentBox = outputJSON["Box" + boxCount];
  return currentBox;
};

module.exports = createBox;
