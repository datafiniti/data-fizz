package DataFizz;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class BookTest {
    Book book;

    @Before
    public void init()
    {
        book = new Book(15.0,"Fairy Tales","Hemanth",2.0,"1025469875");
    }

    @Test
    public void testgetTitle()
    {
        assertEquals("Fairy Tales",book.getTitle());
    }
    @Test
    public void testgetAuthor()
    {
        assertEquals("Hemanth",book.getAuthor());
    }
    @Test
    public void testgetPrice()
    {
        assertEquals(15.0,(double)book.getPrice(),0.0);
    }
    @Test
    public void testgetShippingWeight()
    {
        assertEquals(2.0,(double)book.getShippingWeight(),0.0);
    }
    @Test
    public void testgetISBN()
    {
        assertEquals("1025469875",book.getIsbnNumber());
    }

}
