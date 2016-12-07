package DataFizz.Driver;
import DataFizz.*;

import java.io.IOException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.List;

public class Main {


    public static void main(String[] args) throws IOException {

        FileParser f  =  new FileParser("data/");
        List<Book> allBooks = f.getBooks();
        PackBooks pack = new PackBooks();
        List<Box> all = pack.packBooks(allBooks,15.0);
        ConvertToJson json = new ConvertToJson();
        System.out.print(json.ConvertToJsonString(all));

    }
}
