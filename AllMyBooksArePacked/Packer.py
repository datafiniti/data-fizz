import Book
import ShippingBox

class myPacker (object):

    #Edit capacity of Shipping container weight here
    _capacity = 10;

    # List of Lists
    # Each list( equivalent to a shipping box) will contain a List of book objects
    _PackagedBoxes = [[]]

    #********************************************************************************************
    # This is my Packing Algorithm
    # I created a first fit decreasing (offline) algorithm that packs O(n^2) time
    # Future optimization: Use self balancing binary search tree to achieve O(nlogn) time
    #********************************************************************************************
    def pack(self, myBookCollection):
        #Sort in decreasing order
        bookCollection = sorted(myBookCollection, key=lambda myBook: myBook.getWeight(),reverse = True)

        #First Fit Decreasing variable initialization
        size = len(bookCollection)
        numBoxes = 0;
        remainingBoxSpace = [self._capacity] * size
        self._PackagedBoxes=[ShippingBox.ShippingBox() for i in range(size)]
        foundSpaceForBook = False

        #place (i = 0 to size of Book Collection) items in boxes
        for i in range(0,size,1):
            # Search all current boxes to check for space
            for j in range(0,numBoxes,1):
                # Comparing floating point numbers in python requires comparison
                # 1st part of if Statement: there is space in box
                # 2nd part of if Statement: there is exactly enough space in box (ex: 5.0+5.0 ~= 10)
                if((remainingBoxSpace[j] -bookCollection[i].getWeightVal() > 0.00001) or (-.000001< (bookCollection[i].getWeightVal()-remainingBoxSpace[j]) < .00001)):
                    remainingBoxSpace[j] = remainingBoxSpace[j] - bookCollection[i].getWeightVal()
                    self._PackagedBoxes[j].setContents(bookCollection[i])
                    foundSpaceForBook = True
                    break;

            # if there was no sppacce for the book, we create a new Box
            if (not foundSpaceForBook):
                remainingBoxSpace[numBoxes] = self._capacity-bookCollection[i].getWeightVal()
                self._PackagedBoxes[numBoxes].setContents(bookCollection[i])
                self._PackagedBoxes[numBoxes].setId(numBoxes)
                numBoxes+=1
            else:
                foundSpaceForBook = False

        #clear all shipping boxes that have no contents
        for count in range(size):
            if(count>=numBoxes):
                self._PackagedBoxes[count] = None
                
        return self._PackagedBoxes

        
