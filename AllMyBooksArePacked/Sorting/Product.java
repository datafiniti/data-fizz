package Sorting;

import java.util.Map;

public interface Product extends Comparable<Product> {
    double getPrice();
    double getWeight();
    Map<String, String> getAttrs();
    default int compareTo(Product other) {
        return Double.compare(getWeight(), other.getWeight());
    }
}
