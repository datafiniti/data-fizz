package Sorting;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONString;

import java.util.*;

public class Factory implements JSONString {
    private List<Box> boxes;
    private JSONObject jo;

    public Factory() {
        boxes = new ArrayList<>();
        jo = new JSONObject();
    }

    public Factory(List<Box> boxes) {
        this.boxes = boxes;
        jo = new JSONObject();
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


    public Box addBox(int capacity) {
        Box toAdd = new Box(numBoxes()+1, capacity);
        boxes.add(toAdd);
        return toAdd;
    }

    public int numBoxes() {
        return boxes.size();
    }

    @Override
    public String toJSONString() {
        JSONArray ja = new JSONArray(boxes);
        jo.put("boxes", ja);
        jo.put("number of boxes", numBoxes());
        return jo.toString();
    }
}
