package Sorting;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONString;

import java.util.ArrayList;
import java.util.List;

public class Box implements JSONString{
    private int id;
    private final int MAX_WEIGHT;
    private List<Product> contents;
    private double totalWeight;
    private JSONObject jo;

    public Box(int id, int mw) {
        this.id = id;
        this.MAX_WEIGHT = mw;
        contents = new ArrayList<>();
        jo = new JSONObject();
        jo.put("id", this.id);
    }

    public Box(int id, int mw, List<Product> contents) {
        this(id, mw);
        this.contents = contents;
        totalWeight = 0.0;
        for (Product p : this.contents) {
            totalWeight += p.getWeight();
        }
    }

    /**
     * Adds Product p to Box
     */
    public void add(Product p) {
        if (p.getWeight() + totalWeight > MAX_WEIGHT) {
            throw new IllegalArgumentException("product will not fit in box");
        }
        contents.add(p);
        totalWeight += p.getWeight();
    }

    /**
     * Returns whether the product p will fit in this box
     */
    public boolean canAdd(Product p) {
        return p.getWeight() <= getRemainingSpace();
    }

    /**
     * Returns remaining space in the box
     */
    public double getRemainingSpace() {
        return this.MAX_WEIGHT - totalWeight;
    }

    /**
     * converts this to JSON object with attributes "total weight", and "contents", an array of every
     * product contained in the box
     */
    @Override
    public String toJSONString() {
        String tw = String.format("%.1f", totalWeight);
        jo.put("total weight", "" + tw + " pounds");
        JSONArray ja = new JSONArray(contents);
        jo.put("contents", ja);
        return jo.toString();
    }
}
