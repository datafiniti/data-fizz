package Sorting;

import java.util.Map;

public interface Product extends Comparable<Product> {
    double getPrice();

    double getWeight();

    /**
     * Maps a string of every attribute to a String representing that attr. For use in converting
     * to JSON String
     */
    Map<String, String> getAttrs();

    /**
     * compares Products by weight, with heavier Product being larger
     */
    default int compareTo(Product other) {
        return Double.compare(getWeight(), other.getWeight());
    }
}
