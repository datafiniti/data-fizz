package BookPacker;

import java.io.File;
import java.io.IOException;
import java.util.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

class AmazonParser {
    private ArrayList<Document> docs;

    AmazonParser(List<File> pages) throws IOException {
        this.docs = new ArrayList<>();
        for (File file : pages) {
            this.docs.add(Jsoup.parse(file, "UTF-8"));
        }
    }

    // Returns the following information:
    //        * Title
    //        * Author
    //        * Price
    //        * Shipping Weight
    //        * ISBN-10
    ArrayList<HashMap<String, Object>> basicInfo() {
        ArrayList<HashMap<String, Object>> parsedInfo = new ArrayList<>();
        for (Document doc : docs) {
            HashMap<String, Object> docInfo = new HashMap<>();
        }
        return parsedInfo;
    }
}
