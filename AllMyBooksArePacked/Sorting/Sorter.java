package Sorting;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Sorter {

    public static Factory sort(List<Product> products, int maxWeight) {
        Factory factory = new BSTFactory();
        sortProductsInDescendingOrder(products);
        for (Product p : products) {
            factory.placeInFirstFit(p, maxWeight);
        }
        return factory;
    }

    private static void sortProductsInDescendingOrder(List<Product> products) {
        Comparator<Product> comp = new Comparator<Product>() {public int compare(Product p1, Product p2) {
                                                            return p2.compareTo(p1);}};
        Collections.sort(products, comp);
    }
}
