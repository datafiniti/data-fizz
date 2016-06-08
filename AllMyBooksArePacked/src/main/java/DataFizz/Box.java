package DataFizz;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties("capacity")
public class Box {

    public int id;
    public Double totalWeight;
    private Double capacity;
    public List<Book> contents;


    public Box(int id, Double capacity)
    {
        this.id = id;
        this.capacity = capacity;
        this.contents = new ArrayList<Book>();
        this.totalWeight = 0.0;
    }

    public int getId()
    {
        return id;
    }
    public Double getCapacity()
    {
        return capacity;
    }
    public List<Book> getContents()
    {
        return contents;
    }
    public void addBook(Book book)
    {
        contents.add(book);
        totalWeight += book.getShippingWeight();
    }
    public Double leftSpace()
    {
        return capacity - totalWeight;
    }

}
