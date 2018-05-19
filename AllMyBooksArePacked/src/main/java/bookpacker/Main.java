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
				books.add(bkPkr.getBookFromPage(fileName));
			}
		} catch (IOException e) {
			System.out.println(e);
			System.exit(0);
		}

		Gson gson = new GsonBuilder().setPrettyPrinting().create();

		System.out.print(gson.toJson(bkPkr.packBooks(books)));
	}

}
