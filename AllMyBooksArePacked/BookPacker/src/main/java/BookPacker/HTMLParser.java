package BookPacker;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.nio.file.Files;
import java.nio.file.Paths;

class HTMLParser {
    private String path;

    HTMLParser() {
        this.path = System.getProperty("user.dir") + "/../data/";
    }

    HTMLParser(String path) {
        //modify BookPacker.validateArgs and BookPacker.main to allow for custom path input
        this.path = path;
    }

    ArrayList<HashMap<String, Object>> getInfo() throws IOException {
        List<File> pages = getPages(path);
        if (pages.size() <= 0) throw new AssertionError();
        AmazonParser ap = new AmazonParser(pages);
        return ap.basicInfo();
    }

    //retrieve HTML files from directory
    private List<File> getPages(String path) throws IOException {
        List<File> filesInFolder = new ArrayList<>();
        Files.walk(Paths.get(path)).forEach(filePath -> {
            if (Files.isRegularFile(filePath)) {
                filesInFolder.add(new File(filePath.toString()));
            }
        });
        return filesInFolder;
    }
}