package application;

import java.util.List;
import java.util.ArrayList;

public class BookPacker {
    
    private static HTMLSource htmlSource = HTMLSource.AMAZON;
    
    public static void main(String[] args){
        Book[] books = new Book[20];
        String baseFileName = "book";
        String fileExtension = ".html";
        for(int i = 1; i <= books.length; i++){
            books[i-1] = loadBook(baseFileName + i + fileExtension);
            System.out.println(i + ". " + books[i-1]);
        }//for each book of 20, load from the html
    }//main
    
    /* ------- LOADING BOOKS ------ */
    public static Book loadBook(String bookFileName){
        HTMLReader bookReader = new HTMLReader("AllMyBooksArePacked\\data\\" + bookFileName);
        switch(htmlSource){
        case AMAZON:
            return loadBookFromAmazon(bookReader);
            
        default:
            //Do nothing
            break;
        }//end switch on htmlSource
        return new Book();
    }//loadBook
    
    public static Book loadBookFromAmazon(HTMLReader reader){
        Book book = new Book();
        
        book.setAuthor(extractAuthorFromAmazon(reader));
        book.setTitle(extractTitleFromAmazon(reader));
        book.setPrice(extractPriceFromAmazon(reader));
        book.setShippingWeight(extractShippingWeightFromAmazon(reader));
        book.setISBN10(extractISBN10FromAmazon(reader));
        
        return book;
    }//loadBookFromAmazon
    
    /* --- HELPER METHODS FOR AMAZON BOOK LOADING --- */
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
            elementText = reader.extractElementTextByClass("bb_price", 0);
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
    
    /* ------- BOX PACKING ------- */
    //this is gonna be a hard one
    private static Box[] packBooks(Book[] books, int numberOfBooks){
        return new Box[0];
    }//packBooks
}//end of class: Book Packer
