package application;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import java.util.List;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**The class containing my AllMyBooksArePacked solution, run
 * main to execute. The resulting file will be called
 * "AllMyBooksArePacked_GregMcDonald_Results.json" and will
 * be saved in the DataFizz directory.
 * @author Greg McDonald
 */
public class BookPacker {
    
    public static final int MAX_BOX_WEIGHT = 10;
    
    private static HTMLSource htmlSource = HTMLSource.AMAZON;
    
    /**Run this method to execute my solution!
     * @param args an array of strings containing information relevant
     * to the execution of main. Not used in this solution, could potentially
     * be used to input book html file names.
     */
    public static void main(String[] args){
        Book[] books = new Book[20];
        
        //Load books
        String baseFileName = "book";
        String fileExtension = ".html";
        for(int i = 1; i <= books.length; i++){
            books[i-1] = loadBook(baseFileName + i + fileExtension);
        }//for each book of 20, load from html file
        
        Box[] packedBooks = packBooks(books);
        //This representation does not follow the specification, but is valid
        String jsonRepresentation = convertToJSON(packedBooks, true);
        File file = new File("AllMyBooksArePacked_GregMcDonald_Results.json");
        writeToFile(file,jsonRepresentation);
    }//main
    
    /* ------- OBJECT TO JSON FILE CONVERSION ------- */
    private static String convertToJSON(Object obj, boolean prettyPrinting){
        Gson gson = new Gson();
        if(prettyPrinting){
            gson = new GsonBuilder().setPrettyPrinting().create();
        }//pretty printing enabled
        return gson.toJson(obj);
    }//convertToJSON
    
    private static boolean writeToFile(File file, String text){
        try {
            //write converted json data to the specified file
            FileWriter writer = new FileWriter(file);
            writer.write(text);
            writer.close();
            return true;
        }//attempt to write to file 
        catch (IOException e) {
            return false;
            //e.printStackTrace();
        }//file failed in writing/creation
    }//writeToFile
    
    /* ------- BOX PACKING ------- */
    
    /** The method I implemented to pack boxes is a
     *  solution to the bin packing problem using the
     *  next-fit heuristic. I chose this method because it
     *  has worst case O(n) runtime. 
     *  
     *  Other potential options are the best-fit heuristic or
     *  first-fit heuristic, however their performance worst-case is O(n^2).
     *  But the solutions they produce are more likely to be closer to
     *  optimal. This tradeoff is necessary to ensure that large
     *  numbers of books can be packed in reasonable time.
     *  
     *  A third option, is to exhaustively calculate the optimal solution
     *  by running all possible orderings of the books through the next-fit
     *  heuristic solution, guaranteed to produce the most dense output.
     *  This has O(n!) runtime and is impractical.
     * 
     * @param books An array of Book objects to pack into boxes
     * @return An array of Box objects containing packed books
     */
    private static Box[] packBooks(Book[] books){
        ArrayList<Box> boxes = new ArrayList<Box>();
        int boxID = 1;
        Box currentBox = new Box(boxID++); //start with an empty box
        
        for(int i = 0; i < books.length; i++){
            double bookWeight = Book.parseBookWeight(books[i]);
            if(bookWeight > MAX_BOX_WEIGHT){
                continue;
            }//unpackable book found, skip it
            
            double currentBoxWeight = currentBox.getTotalWeight();
            if((bookWeight + currentBoxWeight) > MAX_BOX_WEIGHT){
                boxes.add(currentBox);
                currentBox = new Box(boxID++);
            }//if box overloads with new book, commit box then make a new one
            currentBox.addBook(books[i]);
        }//for every book
        boxes.add(currentBox);//add the final box
        
        Box[] boxesArray = new Box[boxes.size()]; //Converting to array for returning
        return boxes.toArray(boxesArray);
    }//packBooks
    
    /* --- HELPER METHODS FOR BOX PACKING --- */
    
    /* ------- LOADING BOOKS ------ */
    /** Loads a book from a HTML file. The interpretation of the HTML
     * is based off the htmlSource field.
     * 
     * @param bookFileName A String containing the file path to the book.
     * @return A Book loaded from the given file path
     */
    private static Book loadBook(String bookFileName){
        HTMLReader bookReader = new HTMLReader("AllMyBooksArePacked\\data\\" + bookFileName);
        switch(htmlSource){
        case AMAZON:
            return loadBookFromAmazon(bookReader);
        case EBAY:
            //return loadBookFromEbay(bookReader);
        case SWAPPA:
            //return loadBookFromSwappa(bookReader);
        case CRAIGSLIST:
            //return loadBookFromCraiglist(bookReader);
            
        //Potential to add more cases, for pages other than Amazon
        default:
            //Do nothing
            break;
        }//end switch on htmlSource
        return new Book();
    }//loadBook
    
    /**Loads a book from the given HTML as if it was an Amazon webpage
     * as of 5/7/2015. Future website changes or improperly specified results
     * will cause incorrect results.
     * 
     * @param reader An HTMLReader from which the book will attempt to be loaded
     * @return
     */
    private static Book loadBookFromAmazon(HTMLReader reader){
        Book book = new Book();
        
        book.setAuthor(extractAuthorFromAmazon(reader));
        book.setTitle(extractTitleFromAmazon(reader));
        book.setPrice(extractPriceFromAmazon(reader));
        book.setShippingWeight(extractShippingWeightFromAmazon(reader));
        book.setISBN10(extractISBN10FromAmazon(reader));
        
        return book;
    }//loadBookFromAmazon
    
    /* --- HELPER METHODS FOR AMAZON BOOK LOADING --- */
    //These methods are undocumented, I feel their purpose is self-evident
    private static String extractTitleFromAmazon(HTMLReader reader){
        String pageTitle = reader.extractPageTitle();
        //Clip title string by colons, looks weird but works
        pageTitle = pageTitle.substring(0, pageTitle.lastIndexOf(":"));
        pageTitle = pageTitle.substring(0, pageTitle.lastIndexOf(":"));
        pageTitle = pageTitle.substring(0, pageTitle.lastIndexOf(":"));
        //Extract author
        String bookTitle = pageTitle.substring(0, pageTitle.lastIndexOf(":"));
        
        return bookTitle;
    }//extractTitleFromAmazon
    
    private static String extractAuthorFromAmazon(HTMLReader reader){
        String pageTitle = reader.extractPageTitle();
        //Clip title string by colons, looks weird but works
        pageTitle = pageTitle.substring(0, pageTitle.lastIndexOf(":"));
        pageTitle = pageTitle.substring(0, pageTitle.lastIndexOf(":"));
        pageTitle = pageTitle.substring(0, pageTitle.lastIndexOf(":"));
        //Extract author
        String bookAuthor = pageTitle.substring(pageTitle.lastIndexOf(":") + 1).trim();
        
        return bookAuthor;
    }//extractAuthorFromAmazon
    
    private static String extractPriceFromAmazon(HTMLReader reader){
        String elementText = reader.extractElementTextByID("actualPriceValue");
        //If actualPriceValue is not included, pull the first price found from the html
        if(elementText.equals("")){
            //DEBUG: System.out.println("ACTUAL PRICE VALUE NOT FOUND");
            elementText = reader.extractElementsTextByClass("bb_price").get(0);
        }//if actual price not found, get first of price class
        String price = elementText + " USD";
        return price;
    }//extractPriceFromAmazon
    
    private static String extractShippingWeightFromAmazon(HTMLReader reader){
        //Extract shipping weight
        String shippingWeightText = "Shipping Weight not Found!";
        
        List<String> liTagTexts = reader.extractElementsTextByTag("li");
        for(int i = 0; i < liTagTexts.size(); i++){
            String currentLiText = liTagTexts.get(i).toLowerCase();
            if(currentLiText.contains("shipping weight")){
                shippingWeightText = currentLiText;
                break; //leave the loop work done
            }//shipping weight found
        }//for every li tags text
        
        //DEBUG: System.out.println("<li> tag found: " + shippingWeightText);
        //Clipping the shipping weight text
        int beginWeightIndex = shippingWeightText.indexOf(":") + 1;
        int endWeightIndex = shippingWeightText.indexOf("pounds") + 6;
        shippingWeightText = shippingWeightText.substring(beginWeightIndex, endWeightIndex).trim();
        //DEBUG: System.out.println("clipped weight: " + shippingWeightText);
        return shippingWeightText;
    }//extractShippingWeightFromAmazon
    
    private static long extractISBN10FromAmazon(HTMLReader reader){
      //Extract isbn10 weight
        String isbn10Text = "ISBN10 not Found!";
        
        List<String> liTagTexts = reader.extractElementsTextByTag("li");
        for(int i = 0; i < liTagTexts.size(); i++){
            String currentLiText = liTagTexts.get(i).toLowerCase();
            if(currentLiText.contains("isbn-10")){
                isbn10Text = currentLiText;
                break; //leave the loop work done
            }//isbn10 found
        }//for every li tags text
        
        //DEBUG: System.out.println("<li> tag found: " + isbn10Text);
        //Clipping the isbn10 text
        int beginISBN10Index = isbn10Text.indexOf(":") + 1;
        isbn10Text = isbn10Text.substring(beginISBN10Index).trim();
        isbn10Text = isbn10Text.replaceAll("[^\\d]", "");
        //DEBUG: System.out.println("clipped weight: " + isbn10Text);
        
        long isbn10 = Long.parseLong(isbn10Text);
        return isbn10;
    }//extractISBN10fromAmazon
}//end of class: Book Packer
