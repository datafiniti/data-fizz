exports.findNextFit = function(inputArr, max, weight) {
    return findNextFit(inputArr, max, weight);
}

function findNextFit(inputArr, max, weight) {
 var resultArr = inputArr.slice();
 var arrLength = resultArr.length;
 var midArrIndex = Math.ceil(arrLength/2) - 1;
 var midWeight = parseFloat(resultArr[midArrIndex]['shippingWeight']);

 if( ( weight + parseFloat(resultArr[arrLength-1]['shippingWeight']) > max ) || arrLength == 0 ) {
     return undefined;}
 else if ( arrLength == 1 || ( weight + midWeight == max )){ 
     return resultArr[midArrIndex];}
 else if ( (weight + midWeight) > max ) { 
     resultArr = resultArr.splice(midArrIndex + 1, arrLength - 1);}
 else {
     resultArr = ( midArrIndex > 0 ) ? resultArr.splice(0, midArrIndex + 1) : resultArr.splice(0, 1);}

 return findNextFit(resultArr, max, weight);
}