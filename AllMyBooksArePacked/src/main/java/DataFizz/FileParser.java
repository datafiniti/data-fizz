package DataFizz;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class FileParser {

    ParseBookData parse;
    String location ;
    public FileParser(String path)
    {
        location = FileParser.class.getClassLoader().getResource(path).getPath();
        parse  = new ParseBookData();
    }

    public List<Book> getBooks() throws IOException {
        ArrayList<Book> allBooks = new ArrayList<>();


        File[] allFiles = getAllFiles();

       for(File file : allFiles)
       {
         Book b = parse.getBook(location+file.getName());
         allBooks.add(b);
       }
       return allBooks;
    }
    public File[] getAllFiles()
    {


        File directory = new File(location);
        File[] all  = directory.listFiles();
        return all;
    }
}
