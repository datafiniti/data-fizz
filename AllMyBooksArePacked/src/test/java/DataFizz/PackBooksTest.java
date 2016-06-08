package DataFizz;


import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertArrayEquals;

public class PackBooksTest {

    PackBooks packBooks;

    @Before
    public void init()
    {
        packBooks = new PackBooks();
    }
    @Test
    public void testSortBooks()
    {
        Book book1 = new Book(12.0,"A","A",12.0,"102546987");
        Book book2 = new Book(13.0,"B","B",1.0,"12345678");
        Book book3 = new Book(14.0,"C","C",2.0,"J12456987");
        List<Book> allBooks = Arrays.asList(book1,book2,book3);
        List<Book> sortedBooks = Arrays.asList(book2,book3,book1);
        assertArrayEquals(sortedBooks.toArray(),packBooks.sortBooks(allBooks).toArray());
    }

    @Test
    public void testPackBooks()
    {
        Box result = new Box(1,15.0);
        List<Box> boxes = Arrays.asList(result);
        Book book1 = new Book(12.0,"A","A",12.0,"102546987");
        Book book2 = new Book(13.0,"B","B",1.0,"12345678");
        Book book3 = new Book(14.0,"C","C",2.0,"J12456987");
        List<Book> Booksresult = Arrays.asList(book2,book3,book1);
        List<Book> input = Arrays.asList(book1,book2,book3);
        result.addBook(book2);
        result.addBook(book3);
        result.addBook(book1);
        assertArrayEquals(Booksresult.toArray(),packBooks.packBooks(input,15.0).get(0).getContents().toArray());
    }

    @Test
    public void testPackBooksWithTwoBoxes()
    {
        Box result = new Box(1,10.0);
        Box result2 = new Box(2,10.0);

        List<Box> boxes = Arrays.asList(result,result2);
        Book book1 = new Book(12.0,"A","A",8.0,"102546987");
        Book book2 = new Book(13.0,"B","B",1.0,"12345678");
        Book book3 = new Book(14.0,"C","C",2.0,"J12456987");
        List<Book> finalResult = Arrays.asList(book2,book3);
        result.addBook(book2);
        result.addBook(book3);
        result2.addBook(book1);

        List<Book> all = Arrays.asList(book1,book2,book3);
        assertArrayEquals(boxes.get(0).getContents().toArray(),packBooks.packBooks(all,10.0).get(0).getContents().toArray());
    }

}
