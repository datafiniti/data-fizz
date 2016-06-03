package BookPacker;

import org.jsoup.nodes.Document;
import java.util.ArrayList;
import java.util.HashMap;

abstract class Parser {
    private ArrayList<Document> docs;

    abstract ArrayList<HashMap<String, Object>> basicInfo();
}
