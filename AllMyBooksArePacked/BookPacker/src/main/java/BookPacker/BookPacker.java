package BookPacker;

import java.io.IOException;
import java.util.*;

public class BookPacker {
    public static void main(String[] args) throws IOException {
        validateArgs(args);
        HTMLParser parser = new HTMLParser();
        ArrayList<HashMap<String, Object>> data = new ArrayList<>();
        try {
            data = parser.getInfo();
        } catch (Exception e) {
            e.printStackTrace();
        }

        PackingCalculator pc = new PackingCalculator(data);
        pc.addBoxCount();

        //Make and output JSON
    }

    private static void validateArgs(String[] args) {
        //can be expanded and modified if extensibility is needed
        if (args.length != 0) throw new AssertionError();
    }
}
