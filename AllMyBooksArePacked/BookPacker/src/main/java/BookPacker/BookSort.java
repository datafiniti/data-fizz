package BookPacker;

import java.util.Comparator;
import java.util.Map;

public class BookSort implements Comparator<Map<String, Object>> {
    private final String key;

    public BookSort(String key) {
        this.key = key;
    }

    //sorts hashmaps by shipping weight in descending order
    public int compare(Map<String, Object> first,
                       Map<String, Object> second) {
        double firstValue = (double) first.get(key);
        double secondValue = (double) second.get(key);
        return firstValue < secondValue ? 1 : -1;
    }
}
