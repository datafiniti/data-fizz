package Parsing;

import Sorting.Book;
import Sorting.Product;

import java.io.File;
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


public class AmazonBookParser implements HTMLParser {
    private File file;
    private Document doc;

    public AmazonBookParser(File input) {
        try {
            file = input;
            doc = Jsoup.parse(file, "utf-8");
        } catch (IOException e) {
            System.out.println("error in accessing input file");
            System.exit(0);
        }
    }

    @Override
    public Product parseProduct() {
        return parseBook();
    }

    public Book parseBook() {
        double price = parsePrice();
        double weight = parseWeight();
        String title = parseTitle();
        String author = parseAuthor();
        String ISBN = parseISBN();
        return new Book(weight, price, ISBN, author, title);
    }

    private String parseTitle() {
        Element elem = doc.getElementById("btAsinTitle");
        return elem.text();
    }

    private String parseAuthor() {
        return doc.select("div.buying span a").get(0).text();

    }

    private double parsePrice() {
        Element elem = doc.getElementsByClass("bb_price").get(0);
        String price = elem.text().replaceAll("[^\\.0123456789]","");
        return Double.parseDouble(price);
    }

    private double parseWeight() {
        Elements info = doc.select("td.bucket div.content ul li");
        for (Element e : info) {
            String text = e.text();
            if (text.toLowerCase().contains("weight")) {
                text = text.replaceAll("[^\\.0123456789]","");
                return Double.parseDouble(text);
            }
        }
        return -1.0;
    }

    private String parseISBN() {
        Elements info = doc.select("td.bucket div.content ul li");
        for (Element e : info) {
            String text = e.text();
            if (text.toLowerCase().contains("isbn")) {
                return text.substring(text.indexOf(" ") + 1);
            }
        }
        return null;
    }
}
