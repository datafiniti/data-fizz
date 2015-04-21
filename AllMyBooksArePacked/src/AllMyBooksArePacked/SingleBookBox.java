package AllMyBooksArePacked;

import java.util.ArrayList;

public class SingleBookBox {
	
	private double boxWeightMax;
	private double actualBoxWeight;
	private ArrayList<BookRecord> booksInBox;
	private int boxBookCount;
	
	public SingleBookBox() {
		boxWeightMax = 10.0;
		actualBoxWeight = 0.0;
		booksInBox = new ArrayList<BookRecord>();
		boxBookCount = 0;
	}
	
	public void addBookToBox(BookRecord book){
		double bookWeight = book.getBookWeightAsDouble();
		actualBoxWeight = actualBoxWeight + bookWeight;
		booksInBox.add(book);
		boxBookCount++;
	}
	
	
	//getters and setters
	public double getMaxBoxWeight(){return this.boxWeightMax;}
	public double getActualBoxWeight(){return this.actualBoxWeight;}
	public int getBoxBookCount(){return this.boxBookCount;}
	public ArrayList<BookRecord> getBooksInBox(){return this.booksInBox;}
}
