package bookpacker;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Book {
	String title, author, isbn10;
	double price, shippingWeight;

	static Gson gson = new Gson();

	public String toJson() {
		return gson.toJson(this);
	}
}
