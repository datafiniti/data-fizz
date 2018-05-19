package bookpacker;

import java.util.Comparator;

public class Book {

	// Comparator to sort Books by shippingWeight
	public static Comparator<Book> comparator = new Comparator<Book>()
	{
		public int compare(Book bk1, Book bk2) {
			return ((Double) bk1.shippingWeight).compareTo((Double) bk2.shippingWeight);
		}
	};


	String title, author, isbn10;
	double price, shippingWeight;

}
