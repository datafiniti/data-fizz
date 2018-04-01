package Core.Test;

import Parsing.AmazonBookParser;
import Parsing.Parser;
import Sorting.Book;
import Sorting.Box;
import Sorting.Product;

import java.io.File;
import java.util.List;

public class TestParsing {
    public static void main(String[] args) {
        List<Product> products = Parser.parseDirectory("./data");
        System.out.println(products.size());
        Box b = new Box(1, 1000000, products);
        System.out.println(b.toJSONString());
    }
}
