package Sorting;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.TreeMap;

public class BSTFactory extends Factory {
    private TreeMap<Double, Box> sortedBoxes;

    public BSTFactory() {
        sortedBoxes = new TreeMap<>();
    }

    public BSTFactory(List<Box> boxes) {
        sortedBoxes = new TreeMap<>();
        for (Box b : boxes) {
            sortedBoxes.put(b.getRemainingSpace(), b);
        }
    }

    @Override
    public void placeInFirstFit(Product p, int capacity) {
        Double firstFit = sortedBoxes.ceilingKey(p.getWeight());
        if (firstFit == null) {
            Box b = addBox(capacity);
            fillBox(b, p);
        } else {
            Box fitted = sortedBoxes.get(firstFit);
            fillBox(fitted, p);
        }
    }

    public void fillBox(Box b, Product p) {
        sortedBoxes.remove(b.getRemainingSpace());
        b.add(p);
        sortedBoxes.put(b.getRemainingSpace(), b);
    }

    @Override
    public List<Box> getBoxes() {
        List<Box> lst = new ArrayList<>(sortedBoxes.values());
        return lst;
    }

    @Override
    public Box addBox(int capacity) {
        Box toAdd = new Box(numBoxes()+1, capacity);
        sortedBoxes.put((double)capacity, toAdd);
        return toAdd;
    }

    @Override
    public int numBoxes() {
        return sortedBoxes.size();
    }
}
