package DataFizz;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class PackBooks {

    public List<Book> sortBooks(List<Book> allBooks)
    {
        Collections.sort(allBooks,(Book b1, Book b2)-> b1.getShippingWeight().compareTo(b2.getShippingWeight()));
        return allBooks;
    }

    public List<Box> packBooks(List<Book> allBooks, double capacity)
    {
        List<Book> books = sortBooks(allBooks);
        List<Box> packedBooks = packIntoBoxes(books,books.size(),capacity);
        return packedBooks;
    }

    private List<Box> packIntoBoxes(List<Book> books, int numberOfBooks, double capacity) {

        int binCount = 0;
        List<Box> bins = new ArrayList<>();

        for(int i = 0; i < numberOfBooks; i++)
        {
            int j;
            for(j = 0; j < binCount ; j++)
            {
                 if(bins.get(j).leftSpace() >= books.get(i).getShippingWeight())
                 {
                     bins.get(j).addBook(books.get(i));
                     break;
                 }
            }
            if(j == binCount && books.get(i).getShippingWeight() <= capacity)
            {
                Box b = new Box(binCount,capacity);
                b.addBook(books.get(i));
                bins.add(binCount,b);
                binCount++;
            }
        }
        return bins;

    }
}
