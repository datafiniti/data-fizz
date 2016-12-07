package DataFizz;


import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class BoxTest {
    Box box;

    @Before
    public void init()
    {
        box = new Box(1,15.0);
    }

    @Test
    public void testgetID()
    {
        assertEquals(1,box.getId());
    }

    @Test
    public void testleftSpace()
    {
        box.addBook(new Book(15.0,"XXX","Hemanth",2.0,"1009876543"));
        assertEquals(13.0,box.leftSpace(),0.0);
    }
    @Test
    public void testgetCapacity()
    {
        assertEquals(15.0,box.getCapacity(),0.0);
    }
}
