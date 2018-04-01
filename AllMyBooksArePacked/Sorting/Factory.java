package Sorting;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONString;

import java.util.*;

public abstract class Factory implements JSONString {
    private JSONObject jo;

    public Factory() {
        jo = new JSONObject();
    }

    /**
     * Places Product p into the first box it will fit
     */
    public abstract void placeInFirstFit(Product p, int capacity);

    /**
     * Adds new empty box with max weight @param capacity to the factory
     */
    public abstract Box addBox(int capacity);

    /**
     * Returns the number of boxes currently in the factory
     */
    public abstract int numBoxes();

    /**
     * Returns a list of every box currently in the factory
     */
    public abstract List<Box> getBoxes();

    /**
     * Converts factory into JSON object with attribute "boxes", an array of every box in the factory,
     * and attribute "number of boxes"
     */
    @Override
    public String toJSONString() {
        JSONArray ja = new JSONArray(getBoxes());
        jo.put("boxes", ja);
        jo.put("number of boxes", numBoxes());
        return jo.toString();
    }
}

