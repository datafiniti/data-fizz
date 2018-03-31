package Parsing;

import Sorting.Factory;
import Sorting.Product;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Parser {
    public static List<Product> parseDirectory(String inputDirectory) {
        File directory = new File(inputDirectory);
        if (!directory.isDirectory()) {
            throw new IllegalArgumentException("not a directory");
        }
        File[] files = directory.listFiles();
        List<Product> products = new ArrayList<>();
        HTMLParser p = null;
        for (File f : files) {
            if (!f.isFile()) {
                throw new IllegalArgumentException("given directory contains subdirectories");
            }
            if (isAmazonHTML(f)) {
                p = new AmazonBookParser(f);
            } else {
                System.out.println("can only parse amazon html right now");
                continue;
            }
            products.add(p.parseProduct());
        }
        return products;
    }

    private static boolean isAmazonHTML(File file) {
        try {
            Document doc = Jsoup.parse(file, "utf-8");
            return doc.select("head title").text().toLowerCase().contains("amazon");
        } catch (IOException e) {
            System.out.println("caught IOException");
        }
        return false;
    }

    public static void writeToJSON(Factory fact, String pathToOutFile) {
        try {
            File output = new File(pathToOutFile);
            if (output.isDirectory()) {
                throw new IOException("specified path is a directory, not a file");
            }
            FileWriter fw = new FileWriter(output);
            fw.write(fact.toJSONString());
            fw.close();
        } catch (FileNotFoundException e) {
            System.out.println(e);
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
