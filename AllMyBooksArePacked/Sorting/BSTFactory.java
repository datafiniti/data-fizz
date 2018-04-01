package Sorting;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

public class BSTFactory extends Factory {
    //Intent was to map boxes to weight remaining. Maps to list to allow multiple boxes with same weight remaining
    private TreeMap<Double, List<Box>> sortedBoxes;
    private int size;

    public BSTFactory() {
        sortedBoxes = new TreeMap<>();
        size = 0;
    }

    @Override
    public void placeInFirstFit(Product p, int capacity) {
        Double firstFit = sortedBoxes.ceilingKey(p.getWeight());
        if (firstFit == null) {
            addBox(capacity);
            fillBox(capacity, p);
        } else {
            fillBox(firstFit, p);
        }
    }

    public void fillBox(double key, Product p) {
        List<Box> bin = sortedBoxes.get(key);
        Box b = bin.remove(0);
        if (bin.size() == 0) {
            sortedBoxes.remove(key);
        }
        b.add(p);
        putBox(b.getRemainingSpace(), b);
    }

    @Override
    public List<Box> getBoxes() {
        List<List<Box>> lsts = new ArrayList<>(sortedBoxes.values());
        List<Box> lst = new ArrayList<>();
        for (List<Box> l : lsts) {
            for (Box b : l) {
                lst.add(b);
            }
        }
        return lst;
    }

    @Override
    public Box addBox(int capacity) {
        Box toAdd = new Box(numBoxes()+1, capacity);
        putBox((double)capacity, toAdd);
        size++;
        return toAdd;
    }

    @Override
    public int numBoxes() {
        return size;
    }

    /**
     * Maps Box b to Double key; if no other boxes have same key, creates new List and adds b to it. If existing box
     * is already mapped to given key, b is added to list with that box.
     */
    private void putBox(Double key, Box b) {
        List<Box> boxes = sortedBoxes.get(key);
        if (boxes == null) {
            boxes = new ArrayList<>();
            boxes.add(b);
            sortedBoxes.put(key, boxes);
        } else {
            boxes.add(b);
        }
    }
}
