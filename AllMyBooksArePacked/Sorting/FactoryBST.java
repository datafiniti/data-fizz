package Sorting;

import java.util.List;
import java.util.TreeMap;

public class FactoryBST extends Factory {
    private TreeMap<Double, Box> sortedBoxes;

    public FactoryBST() {
        sortedBoxes = new TreeMap<>();
    }

    public FactoryBST(List<Box> boxes) {
        super(boxes);
        sortedBoxes = new TreeMap<>();
        for (Box b : boxes) {
            sortedBoxes.put(b.getRemainingSpace(), b);
        }
    }

    @Override
    public void placeInFirstFit(Product p, int capacity) {
        Double firstFit = sortedBoxes.ceilingKey(p.getWeight());
        if (firstFit == null) {
            addBox(capacity);
        }
        Box fitted = sortedBoxes.get(firstFit);
        fillBox(fitted, p);
    }

    public void fillBox(Box b, Product p) {
        sortedBoxes.remove(b);
        b.add(p);
        sortedBoxes.put(b.getRemainingSpace(), b);
    }

    @Override
    public Box addBox(int capacity) {
        Box toAdd = new Box(numBoxes()+1, capacity);
        sortedBoxes.put((double)capacity, toAdd);
        return toAdd;
    }
}
