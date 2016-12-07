exports.sort = function (books) {

    return quickSort(books, 0, books.length - 1);
}

function  quickSort(arr, left, right)
{
	var i = left;
	var j = right;
	var tmp;
	pivotidx = (left + right) / 2;
	var pivot = getWeight(arr[pivotidx.toFixed()]);
	/* partition */
	while (i <= j)
	{
		while (getWeight(arr[i]) < pivot)
		i++;
		while (getWeight(arr[j]) > pivot)
			j--;
		if (i <= j)
		{
			tmp = arr[i];
			arr[i] = arr[j];
			arr[j] = tmp;
			i++;
			j--;
		}
	}

	/* recursion */
	if (left < j)
		quickSort(arr, left, j);
	if (i < right)
		quickSort(arr, i, right);
	return arr;
}

function getWeight(book) {
    return parseFloat(book.shipping_weight.split(" ")[0]);
}