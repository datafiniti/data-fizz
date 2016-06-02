package BookPacker;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.nio.file.Path;
import java.nio.file.Files;
import java.nio.file.Paths;
import com.diffplug.common.base.Errors;

class HTMLParser {
    private String path;

    HTMLParser() {
        this.path = System.getProperty("user.dir") + "../data/";
    }

    HTMLParser(String path, boolean isURL) {
        //modify BookPacker.validateArgs and BookPacker.main to allow for custom path input
        this.path = path;
    }

    ArrayList<HashMap<String, Object>> getInfo() throws IOException {
        ArrayList<HashMap<String, Object>> data = new ArrayList<HashMap<String, Object>>();
        List<File> pages = getPages(path);
        for (File file : pages) {
            data.add(parseData(file));
        }
        return data;
    }

    //retrieve HTML files from directory
    private List<File> getPages(String path) throws IOException {
        List<File> filesInFolder = Files.walk(Paths.get(path))
                .filter(Files::isRegularFile)
                .filter(Errors.suppress().wrapWithDefault(Files::isHidden, false))
                .map(Path::toFile)
                .collect(Collectors.toList());
        return filesInFolder;
    }

    private HashMap<String, Object> parseData(File file) {

    }
}

