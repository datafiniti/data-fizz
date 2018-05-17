package bookpacker;

import java.io.File;
import java.io.IOException;

public abstract class BookPacker {

	public abstract Book getBookFromPage(File webpage) throws IOException;

	public Book getBookFromPage(String fileName) throws IOException {
		return this.getBookFromPage(new File(fileName));
	}

}
