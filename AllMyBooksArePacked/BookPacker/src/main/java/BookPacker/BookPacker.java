package BookPacker;

import org.apache.commons.io.FileUtils;

import java.io.File;
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
        String json = pc.boxSort();

        writeJSONToFile(json);
    }

    private static void validateArgs(String[] args) {
        //can be expanded and modified if extensibility is needed
        if (args.length != 0) throw new AssertionError();
    }

    private static void writeJSONToFile(String json) {
        File file = new File("output.json");
        try {
            FileUtils.writeStringToFile(file, json, "UTF-16");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
