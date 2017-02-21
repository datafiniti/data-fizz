package AllMyBooksArePacked;

import java.util.ArrayList;

public class BookCollection{
	
	private int bookCount;
	private ArrayList<BookRecord> bookCollection;
	private ArrayList<Double> bookCollectionWeights;
    private double[] bookWeightArray;
	
	public BookCollection() {
		this.bookCollection = new ArrayList<BookRecord>();
		this.bookCollectionWeights = new ArrayList<Double>();
		this.bookCount = 0;
	}
	
	public void addBookToCollection(BookRecord book){
		bookCollection.add(book);
		bookCollectionWeights.add(book.getBookWeightAsDouble());
		bookCount++;
	}
	
	
	//getters and setters
	public ArrayList<BookRecord> getBookCollection(){return this.bookCollection;}
	public void setBookCollection(ArrayList<BookRecord> books){this.bookCollection = books;}
	public int getBookCount(){return this.bookCount;}
	public void setBookCount(int count){this.bookCount = count;}
	
	public BookRecord getBook(int index){
		return bookCollection.get(index);
	}
	
	
	public BoxesForShipping prepareBooksForShipping() {
		BoxesForShipping bookOrder = new BoxesForShipping();
		
		int leftIndex = 0;
		int rightIndex = bookCount - 1;
		
		
		int indexsTraversed = 0;
		while(indexsTraversed != bookCount){
			SingleBookBox newBox = new SingleBookBox();
			newBox.addBookToBox(bookCollection.get(rightIndex));
			while(newBox.getActualBoxWeight() + bookCollection.get(leftIndex).getBookWeightAsDouble() < newBox.getMaxBoxWeight()){
				newBox.addBookToBox(bookCollection.get(leftIndex));
				leftIndex++;
				indexsTraversed++;
			}
			bookOrder.addBoxToOrder(newBox);
			rightIndex--;
			indexsTraversed++;
		}
		return bookOrder;
	}
	
	
	// This method is used to sort the array using quicksort algorithm.
    // It takes the left and the right end of the array as the two cursors.
    public void collectionQuickSort(int left, int right){
    	
        // If both cursor scanned the complete array quicksort exits
        if(left >= right)
            return;
        
        // For the simplicity, we took the right most item of the array as a pivot 
        double pivot = bookCollectionWeights.get(right);
        int partition = partition(left, right, pivot);
        
        // Recursively, calls the quicksort with the different left and right parameters of the sub-array
        collectionQuickSort(0, partition-1);
        collectionQuickSort(partition+1, right);
    }
    // This method is used to partition the given array and returns the integer which points to the sorted pivot index
    private int partition(int left, int right, double pivot){
        int leftCursor = left-1;
        int rightCursor = right;
        while(leftCursor < rightCursor){
                while(bookCollectionWeights.get(++leftCursor) < pivot);
                while(rightCursor > 0 && bookCollectionWeights.get(--rightCursor) > pivot);
            if(leftCursor >= rightCursor){
                break;
            }else{
                swap(leftCursor, rightCursor);
            }
        }
        swap(leftCursor, right);
        return leftCursor;
    }
    // This method is used to swap the values between the two given index
    public void swap(int left,int right){
        double weightTemp = bookCollectionWeights.get(left);
        bookCollectionWeights.set(left, bookCollectionWeights.get(right));
        bookCollectionWeights.set(right, weightTemp);
        
        BookRecord bookTemp = bookCollection.get(left);
        bookCollection.set(left, bookCollection.get(right));
        bookCollection.set(right, bookTemp);
    }
}