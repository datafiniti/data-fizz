package Core;

import Parsing.Parser;
import Sorting.Factory;
import Sorting.Product;
import Sorting.Sorter;

import java.util.List;

public class Main {
    static String inputDirectory = "./data";
    static String outputFile = "./Sorting/Output.json";

    public static void main(String[] args) {
        List<Product> products = Parser.parseDirectory(inputDirectory);
        Factory sorted = Sorter.sort(products, 10);
        Parser.writeToJSON(sorted, outputFile);
    }
}
