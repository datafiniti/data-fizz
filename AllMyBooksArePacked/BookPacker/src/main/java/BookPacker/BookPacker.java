package BookPacker;

import java.io.IOException;
import java.util.*;

public class BookPacker {
    public static void main(String[] args) throws IOException {
        validateArgs(args);
        HTMLParser parser = new HTMLParser();
        try {
            ArrayList<HashMap<String, Object>> data = parser.getInfo();
        } catch (Exception e) {
            e.printStackTrace();
        }

        //Get data from HTML documents
        //Calculate optimal box packing
        //Make and output JSON
    }

    private static void validateArgs(String[] args) {
        //can be expanded and modified if extensibility is needed
        assert args.length == 0;
    }
}
