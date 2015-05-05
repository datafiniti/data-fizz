package application;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class TestSuite {
    
    private static final boolean DEBUG = true;
    
    public static void main(String[] args){
        //Testing Book Functionality
        debugPrint("TEST SECTION: Book function\n");
        testBookDefaultConstructor();
        testBookCompleteConstructor();
        testBookAccessorsAndMutators();
        testBookEquals();
        //Testing Box Functionality
        debugPrint("\nTEST SECTION: Box function\n");
        testBoxConstructor();
        testBoxBookAdding();
        //Testing Object to JSON Conversion
        debugPrint("\nTEST SECTION: JSON Conversion\n");
        testBoxToJSONConversion();
        //Testing HTMLReader Function
        debugPrint("\nTEST SECTION: HTML Reading with Jsoup\n");
        testGetDocument();
        testDataExtraction();
    }//main
    
    /* --- TESTING SECTIONS --- */
    /* --- HTMLReader / Jsoup --- */
    private static void testGetDocument(){
        debugPrint("Get Document test... ");
        HTMLReader htmlReader = new HTMLReader();
        
        //String validFilepath = "C:\\Users\\GregMcD\\workspace\\DataFizz\\AllMyBooksArePacked\\data\\book1.html";
        String validFilepath = "AllMyBooksArePacked\\data\\book1.html";
        String invalidFilepath = "/notdata/encyclopedia1.html";
        Document validDoc = htmlReader.getDocument(validFilepath);
        Document invalidDoc = htmlReader.getDocument(invalidFilepath);
        
        assertEquals(validDoc != null, true);
        assertEquals(invalidDoc == null, true);
        
        debugPrint("complete\n");
    }//testGetDocument
    
    private static void testDataExtraction(){
        debugPrint("Data Extraction test... ");
        HTMLReader htmlReader = new HTMLReader();
        
        //String validFilepath = "C:\\Users\\GregMcD\\workspace\\DataFizz\\AllMyBooksArePacked\\data\\book1.html";
        String book1Filepath = "AllMyBooksArePacked\\data\\book1.html";
        Document book1Doc = htmlReader.getDocument(book1Filepath);
        assertEquals(book1Filepath != null, true);
        
        String pageTitle = htmlReader.extractTitle(book1Doc);
        System.out.println(pageTitle);
        
        debugPrint("complete\n");
    }//testDataExtraction
    
    /* --- JSON CONVERSION --- */
    private static void testBoxToJSONConversion(){
        debugPrint("Sample Conversion test... ");
        Box box = new Box(1);
        Book book = new Book("The Great Big Beautiful Tomorrow", "Cory Doctorow", "$9.82 USD", "1.1 pounds", 1604864044L);
        box.addBook(book);
        
        Gson gson = new Gson(); //without pretty printing
        //Gson gson = new GsonBuilder().setPrettyPrinting().create();
        
        // convert java object to JSON format,
        // and returned as JSON formatted string
        String json = gson.toJson(box);
        debugPrint("\n" + json + "\n");
        debugPrint("complete\n");
    }//testBoxToJSONConversion
    
    /* --- BOX FUNCTION --- */
    private static void testBoxConstructor(){
        debugPrint("Constructor test... ");
        Box testBox = new Box(1);
        assertEquals(testBox.getID(), 1);
        assertEquals(testBox.getTotalWeight(), 0.0);
        assertEquals(testBox.getContents().length, 0);
        
        debugPrint("complete\n");
    }//testBoxConstructor
    
    private static void testBoxBookAdding(){
        debugPrint("Book Adding test... ");
        Box testBox = new Box(1);
        Book book1 = new Book("Hamlet", "William Shakespeare", "$19.99 USD", "3 pounds", 123456789);
        boolean firstAddSuccess = testBox.addBook(book1);
        assertEquals(firstAddSuccess, true);
        assertEquals(testBox.getTotalWeight(), 3.0);
        assertEquals(testBox.getContents().length, 1);
        
        Book book2 = new Book("Macbeth", "William Shakespeare", "$10.00 USD", "4.2 pounds", 123456789);
        boolean secondAddSuccess = testBox.addBook(book2);
        assertEquals(secondAddSuccess, true);
        assertEquals(testBox.getTotalWeight(), 7.2);
        assertEquals(testBox.getContents().length, 2);
        
        Book book3 = new Book("Beowulf", "Author Unknown", "$23.54 USD", "2.9 pounds", 1357902468);
        boolean overloadAddSuccess = testBox.addBook(book3);
        assertEquals(overloadAddSuccess, false);
        assertEquals(testBox.getTotalWeight(), 7.2);
        assertEquals(testBox.getContents().length, 2);
        
        debugPrint("complete\n");
    }//testBoxConstructor
    
    /* --- BOOK FUNCTION --- */
    private static void testBookDefaultConstructor(){
        debugPrint("Default constructor test... ");
        Book test = new Book();
        assertEquals(test.getTitle(), "No Title");
        assertEquals(test.getAuthor(), "No Author");
        assertEquals(test.getPrice(), "No Price");
        assertEquals(test.getShippingWeight(), "No Shipping Weight");
        assertEquals(test.getISBN10(), -1L);
        
        debugPrint("complete\n");
    }//testBookDefaultConstructor
    
    private static void testBookCompleteConstructor(){
        debugPrint("Complete constructor test... ");
        Book test = new Book("Hamlet", "William Shakespeare", "$19.99 USD", "3 pounds", 123456789);
        assertEquals(test.getTitle(), "Hamlet");
        assertEquals(test.getAuthor(), "William Shakespeare");
        assertEquals(test.getPrice(), "$19.99 USD");
        assertEquals(test.getShippingWeight(), "3 pounds");
        assertEquals(test.getISBN10(), 123456789L);
        
        debugPrint("complete\n");
    }//testBookCompleteConstructor
    
    private static void testBookAccessorsAndMutators(){
        debugPrint("Accessors and Mutators test... ");
        Book test = new Book();
        test.setTitle("Hamlet");
        assertEquals(test.getTitle(), "Hamlet");
        test.setAuthor("William Shakespeare");
        assertEquals(test.getAuthor(), "William Shakespeare");
        test.setPrice("$19.99 USD");
        assertEquals(test.getPrice(), "$19.99 USD");
        test.setShippingWeight("3 pounds");
        assertEquals(test.getShippingWeight(), "3 pounds");
        test.setISBN10(123456789);
        assertEquals(test.getISBN10(), 123456789L);
        
        debugPrint("complete\n");
    }//testBookCompleteConstructor
    
    private static void testBookEquals(){
        debugPrint("Equals test... ");
        Book testEquals0 = new Book("Hamlet", "William Shakespeare", "$19.99 USD", "3 pounds", 123456789);
        Book testEquals1 = new Book("Hamlet", "William Shakespeare", "$19.99 USD", "3 pounds", 123456789);
        Book testNotEqual = new Book("Hamlet and Black-eyed Peas", "Will.i.Am Shakespeare", "$20.00 USD", "4 pounds", 987654321);
        
        assertEquals(testEquals0.equals(testEquals1), true);
        assertEquals(testEquals1.equals(testEquals0), true);
        assertEquals(testEquals1.equals(testEquals1), true);
        assertEquals(testNotEqual.equals(testEquals0), false);
        assertEquals(testEquals0.equals(testNotEqual), false);
        
        debugPrint("complete\n");
    }//testBookCompleteConstructor
    
    /*------- Test Helper Methods -------*/
    private static void assertEquals(Object arg0, Object arg1){
        try{
            assert arg0.equals(arg1);
        }
        catch(AssertionError ae){
            System.out.print("\n!!! FAILED TO ASSERT: " + arg0.toString() 
                             + " EQUAL TO " + arg1.toString() + "\n");
        }
    }//assert equals
    
    private static void debugPrint(String text){
        if(DEBUG){
            System.out.print(text);
        }//if debug is true, print
    }//debugPrint
}//end class TestSuite

