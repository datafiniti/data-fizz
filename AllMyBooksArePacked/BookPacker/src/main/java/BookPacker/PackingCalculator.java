package BookPacker;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.*;

class PackingCalculator {
    private final double maxWeight = 10.0;
    private ArrayList<HashMap<String, Object>> data;

    PackingCalculator(ArrayList<HashMap<String, Object>> data) {
        this.data = data;
    }

    String boxSort() {
        Collections.sort(data, new BookSort("shipping_weight"));

        ArrayList<Double> boxes = new ArrayList<>();
        for (HashMap<String, Object> book : data) {
            double weight = (double) book.get("shipping_weight");
            if (boxes.isEmpty()) {
                boxes.add(maxWeight - weight);
                book.put("box", 1);
                continue;
            }
            for (int i = 0; i < boxes.size(); i++) {
                double remainingWeight = boxes.get(i);
                if (weight < remainingWeight) {
                    remainingWeight -= weight;
                    book.put("box", i + 1);
                    boxes.set(i, remainingWeight);
                    break;
                } else {
                    if (i == boxes.size() - 1) {
                        boxes.add(maxWeight);
                    }
                }
            }
        }

        return formatForJSON(boxes);
    }

    private String formatForJSON(ArrayList<Double> boxes) {
        int numBoxes = boxes.size();

        ArrayList<HashMap<String, Object>> json = new ArrayList<>(numBoxes);

        for (int i = 0; i < numBoxes; i++) {
            HashMap<String, Object> box = new HashMap<>();
            double remainingWeight = boxes.get(i);
            String weight = formatWeight(maxWeight - remainingWeight);

            box.put("id", i+1);
            box.put("totalWeight", weight);
            box.put("contents", new ArrayList<HashMap<String, Object>>());

            json.add(box);
        }

        for (HashMap<String, Object> book : data) {
            int boxNum = (int) book.get("box");
            book.remove("box");
            HashMap<String, Object> box = json.get(boxNum - 1); //box 1 is at idx 0, etc.
            String weight = book.get("shipping_weight").toString() + " pounds";
            book.put("shipping_weight", weight);
            ArrayList<HashMap<String, Object>> contents = (ArrayList<HashMap<String, Object>>) box.get("contents");
            contents.add(book);
        }

        Gson gson = new GsonBuilder().disableHtmlEscaping().setPrettyPrinting().create();
        String jsonStr = gson.toJson(json);

        return jsonStr;
    }

    private String formatWeight(double val) {
        DecimalFormat df = new DecimalFormat("#.#");
        String roundedWeight = df.format(val);
        return roundedWeight + " pounds";
    }
}
