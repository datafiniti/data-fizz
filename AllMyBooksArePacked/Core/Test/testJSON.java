package Core.Test;

import Sorting.Book;
import Sorting.Product;
import org.json.*;

import java.util.ArrayList;
import java.util.List;

public class testJSON {
    public static void main(String[] args) {
        List<Product> items = new ArrayList<>();
        items.add(new Book(1.2, 1.5, "test", "word", "hap"));
        items.add(new Book(5.0, 4.5, "a", "b", "c"));
        JSONArray ja = new JSONArray(items);
        JSONObject jo = new JSONObject();
        jo.put("items", ja);
        System.out.println(jo.toString());
        jo.put("items", "empty");
        System.out.println(jo.toString());
        Book one = new Book(1.0, 10, null, null, null);
        Book two = new Book(5.0, 0, null, null, null);
        if (two.compareTo(one) > 0) {
            System.out.println("passed");
        }
    }
}
