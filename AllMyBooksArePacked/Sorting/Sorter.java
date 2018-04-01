package Sorting;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Sorter {

    /**
     * Sorts given products into boxes using the FirstFit bin sorting algorithm. Depending on
     * the type of Factory, the bins will either be sorted by ID or by available weight. BSTFactory
     * uses TreeMap to sort bins by available weight, making runtime O(NlogN). ArrayFactory runs
     * in O(N^2)
     */
    public static Factory sort(List<Product> products, int maxWeight) {
        Factory factory = new BSTFactory(); //Change this to a ArrayFactory object to change implementation of sorting algorithm
        sortProductsInDescendingOrder(products);
        for (Product p : products) {
            factory.placeInFirstFit(p, maxWeight);
        }
        return factory;
    }

    /**
     * Sorts products in descending order of product weight
     */
    private static void sortProductsInDescendingOrder(List<Product> products) {
        Comparator<Product> comp = new Comparator<Product>() {public int compare(Product p1, Product p2) {
                                                            return p2.compareTo(p1);}};
        Collections.sort(products, comp);
    }
}
