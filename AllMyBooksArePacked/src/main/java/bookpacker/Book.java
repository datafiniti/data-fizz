package bookpacker;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Book {
	String title, author, isbn10;
	double price, shippingWeight;

	public String toJson() {
		Gson gson = new Gson();
		return "asdf";
	}
}
