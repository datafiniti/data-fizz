'use strict';

const bookSortDesc = (bookA, bookB) => {
  if (bookA.weight < bookB.weight)
    return 1;
  if (bookA.weight > bookB.weight)
    return -1;
  return 0;
};

module.exports = {
	bookSortDesc
}
