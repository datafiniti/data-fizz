package BookPacker;

import java.util.*;

public class PackingCalculator {
    private final double maxWeight = 10.0;
    private ArrayList<HashMap<String, Object>> data;

    PackingCalculator(ArrayList<HashMap<String, Object>> data) {
        this.data = data;
    }

    ArrayList<HashMap<String, Object>> addBoxCount() {
        int numBooks = data.size();
        double max = maxWeight;
        ArrayList<Double> boxes = new ArrayList<>();

        Collections.sort(data, new BookSort("shipping_weight"));

        for (HashMap<String, Object> book : data) {
            double weight = (double) book.get("shipping_weight");
            if (boxes.isEmpty()) {
                boxes.add(maxWeight - weight);
                book.put("box", 1);
            } else {
                for (int i = 0; i < boxes.size(); i++) {
                    double remainingWeight = boxes.get(i);
                    if (weight < remainingWeight) {
                        remainingWeight -= weight;
                        book.put("box", i+1);
                        boxes.set(i, remainingWeight);
                        break;
                    } else {
                        boxes.add(maxWeight);
                    }
                }
            }
        }

        return data;
    }
}
