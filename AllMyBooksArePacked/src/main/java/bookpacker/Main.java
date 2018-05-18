package bookpacker;

import java.util.ArrayList;
import java.util.Collections;
import java.io.IOException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class Main {

	public static void main(String[] args) {
		BookPacker bkPkr = new AmazonBookPacker();
		ArrayList<Book> books = new ArrayList<Book>();
		try {
			for (String fileName : args) {
				//System.out.println(String.format("Trying %s", fileName));
				books.add(bkPkr.getBookFromPage(fileName));
			}
		} catch (IOException e) {
			System.out.println(e);
			System.exit(0);
		}

		/*
		Collections.sort(books, bkPkr.bookComparator.reversed());

		for (Book book : books) {
			System.out.println(book.toJson());
			System.out.println();
		}
		*/

		Gson gson = new GsonBuilder().setPrettyPrinting().create();

		/*for (BookPacker.BookBin bin : bkPkr.packBooks(books)) {
			System.out.println(gson.toJson(bin));
		}*/


		System.out.println(gson.toJson(bkPkr.packBooks(books)));
	}

}
