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

    public abstract void placeInFirstFit(Product p, int capacity);

    public abstract Box addBox(int capacity);

    public abstract int numBoxes();

    public abstract List<Box> getBoxes();

    @Override
    public String toJSONString() {
        JSONArray ja = new JSONArray(getBoxes());
        jo.put("boxes", ja);
        jo.put("number of boxes", numBoxes());
        return jo.toString();
    }
}

