package bookpacker;

import java.io.IOException;
import java.net.URL;

import static org.junit.Assert.*;
import org.junit.Test;

public class AmazonBookPackerTest {

	@Test
	public void testExtraction() throws IOException {
		AmazonBookPacker bkPkr = new AmazonBookPacker();
		URL url = this.getClass().getResource("zealotBook.html");
		Book bk = bkPkr.getBookFromPage(url.getFile());
		assertEquals("Zealot: The Life and Times of Jesus of Nazareth [Hardcover]", bk.title);
		assertEquals("Reza Aslan", bk.author);
		assertEquals(16.89, bk.price, 0.0d);
		assertEquals("140006922X", bk.isbn10);
		assertEquals(1.2, bk.shippingWeight, 0.0d);
	}

	@Test
	public void testVariousFiles() throws IOException {
		AmazonBookPacker bkPkr = new AmazonBookPacker();
		for (int i = 1; i <= 20; i++) {
			URL url = this.getClass().getResource(String.format("small_data/book%d.html", i));
			Book bk = bkPkr.getBookFromPage(url.getFile());
		}
	}
}
