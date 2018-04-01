package Sorting;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONString;

import java.util.*;

public class ArrayFactory extends Factory {
    private List<Box> boxes;

    public ArrayFactory() {
        boxes = new ArrayList<>();
    }

    public ArrayFactory(List<Box> boxes) {
        this.boxes = boxes;
    }

    public void placeInFirstFit(Product p, int capacity) {
        boolean added = false;
        for (Box b : boxes) {
            if (b.canAdd(p)) {
                b.add(p);
                added = true;
            }
        }
        if (!added) {
            Box b = addBox(capacity);
            b.add(p);
        }
    }


    @Override
    public Box addBox(int capacity) {
        Box toAdd = new Box(numBoxes()+1, capacity);
        boxes.add(toAdd);
        return toAdd;
    }

    @Override
    public int numBoxes() {
        return boxes.size();
    }

    @Override
    public List<Box> getBoxes() {
        return boxes;
    }
}
