package bookpacker;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.io.File;
import java.io.IOException;

public abstract class BookPacker {

	// Abstract method to extract information from a webpage and create a Book
	public abstract Book getBookFromPage(File webpage) throws IOException;

	// Overload to accept filenames
	public Book getBookFromPage(String fileName) throws IOException {
		return this.getBookFromPage(new File(fileName));
	}


	// A nested class to facilitate the bin packing algorithm/
	class BookBin {

		double capacity, totalWeight;
		List<Book> books;

		public BookBin(double capacity) {
			this.books = new ArrayList<Book>();
			this.capacity = capacity;
			this.totalWeight = 0.0d;
		}

		public boolean add(Book bk) {
			if (this.totalWeight + bk.shippingWeight <= this.capacity) {
				this.totalWeight += bk.shippingWeight;
				return this.books.add(bk);
			} else { return false; }
		}
	}

	/* This is an implementation of the First Fit Decreasing algorithm
	for the Bin Packing Problem. */
	public ArrayList<BookBin> packBooks(ArrayList<Book> books, double binCapacity) {
		ArrayList<BookBin> bins = new ArrayList<BookBin>();
		
		Collections.sort(books, Book.comparator.reversed());

		for (Book bk : books) {
			// Assume that we will need a new bin
			boolean needNewBin = true;
			for (BookBin bin : bins) {
				if (bin.add(bk)) {
					// we found a bin!
					needNewBin = false;
					break;
				}
			}
			if (needNewBin) { // Create a new bin
				BookBin newBin = new BookBin(binCapacity);
				if (newBin.add(bk)) {
					bins.add(newBin);
					continue;
				} else { // We can't add a book to a new bin
					throw new IllegalArgumentException("A book is heavier than the bin capacity.");
				}
			}
		}
	
		return bins;
	}

	public ArrayList<BookBin> packBooks(ArrayList<Book> books) {
		return packBooks(books, 10.0d);
	}

}
