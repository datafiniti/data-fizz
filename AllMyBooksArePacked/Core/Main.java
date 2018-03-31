package Core;

import Parsing.Parser;
import Sorting.Factory;
import Sorting.Product;
import Sorting.Sorter;

import java.util.List;

//TODO: remember bst implementation of first fit algorithm
public class Main {
    static String inputDirectory = "./data";
    public static void main(String[] args) {
        List<Product> products = Parser.parseDirectory(inputDirectory);
        Factory sorted = Sorter.sort(products, 10);
        System.out.println(sorted.toJSONString());
    }
}
