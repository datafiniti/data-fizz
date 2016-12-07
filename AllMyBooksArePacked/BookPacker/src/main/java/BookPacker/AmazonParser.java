package BookPacker;

import java.io.File;
import java.io.IOException;
import java.util.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

class AmazonParser extends Parser{
    private ArrayList<Document> docs;

    //static character lengths that will be parsed
    private final int preWeightStrLen = 17;
    private final int postWeightStrLen = 42;
    private final int preIsbnStrLen = 9;

    AmazonParser(List<File> pages) throws IOException {
        this.docs = new ArrayList<>();
        for (File file : pages) {
            this.docs.add(Jsoup.parse(file, "UTF-8"));
        }
    }

    ArrayList<HashMap<String, Object>> basicInfo() {
        ArrayList<HashMap<String, Object>> parsedInfo = new ArrayList<>();
        for (Document doc : docs) {
            HashMap<String, Object> docInfo = new HashMap<>();

            String title = getTitle(doc);
            String author = getAuthor(doc);
            String price = getPrice(doc);
            double weight = getWeight(doc);
            String isbn = getISBN(doc);

            docInfo.put("title", title);
            docInfo.put("author", author);
            docInfo.put("price", price);
            docInfo.put("shipping_weight", weight);
            docInfo.put("isbn-10", isbn);

            parsedInfo.add(docInfo);
        }
        return parsedInfo;
    }

    private String getTitle(Document doc) {
        Element title = doc.getElementById("btAsinTitle");
        title.children().remove();
        return title.text();
    }

    private String getAuthor(Document doc) {
        Element authorElem = doc.getElementsByClass("byLinePipe").first();
        return authorElem.parent().text();
    }

    private String getPrice(Document doc) {
        String price = doc.getElementsByClass("bb_price").first().text();
        String currency = price + " USD";
        return currency;
    }

    //all weights are in pounds
    private double getWeight(Document doc) {
        String parent = doc.select("li:contains(Shipping Weight:)").first().text();
        String weight = parent.substring(preWeightStrLen, parent.length() - postWeightStrLen);
        return Double.parseDouble(weight);
    }

    //ISBN-10
    //Can have character 'X', so String is used instead of int
    private String getISBN(Document doc) {
        String parent = doc.select("li:contains(isbn-10:)").first().text();
        return parent.substring(preIsbnStrLen, parent.length());
    }
}
