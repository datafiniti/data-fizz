package Sorting;

import org.json.JSONString;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class Book implements Product, JSONString {
    private double weight;
    private double price;
    private String ISBN;
    private String author;
    private String title;
    private Map<String, String> attrs;
    private JSONObject jo;

    public Book(double weight, double price) {
        this.weight = weight;
        this.price = price;
        attrs = new HashMap<>();
        attrs.put("weight", Double.toString(this.weight) + " pounds");
        attrs.put("price", "$" + Double.toString(this.price));
    }

    public Book(double weight, double price, String ISBN, String author, String title) {
        this(weight, price);
        this.ISBN = ISBN;
        this.author = author;
        this.title = title;
        attrs.put("ISBN", this.ISBN);
        attrs.put("author", this.author);
        attrs.put("title", this.title);
        jo = new JSONObject();
        for (String key : attrs.keySet()) {
            jo.put(key, attrs.get(key));
        }
    }

    @Override
    public double getPrice() {
        return price;
    }

    @Override
    public double getWeight() {
        return weight;
    }

    @Override
    public Map<String, String> getAttrs() {
        return attrs;
    }

    @Override
    public String toJSONString() {
        return jo.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || !(o instanceof Book)) {
            return false;
        }
        Book other = (Book) o;
        return other.attrs.equals(attrs);
    }
}