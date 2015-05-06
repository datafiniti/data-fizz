package application;

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
        //book.setTitle(reader.extractElementText("btAsinTitle"));
        String pageTitle = reader.extractPageTitle();
        //Clip title string by colons, looks weird but works
        pageTitle = pageTitle.substring(0, pageTitle.lastIndexOf(":"));
        pageTitle = pageTitle.substring(0, pageTitle.lastIndexOf(":"));
        pageTitle = pageTitle.substring(0, pageTitle.lastIndexOf(":"));
        //Extract author
        String bookAuthor = pageTitle.substring(pageTitle.lastIndexOf(":") + 1).trim();
        book.setAuthor(bookAuthor);
        //Extract title
        String bookTitle = pageTitle.substring(0, pageTitle.lastIndexOf(":"));
        book.setTitle(bookTitle);
        
        //Extract price
        String elementText = reader.extractElementText("listPriceValue");
        if(elementText.equals("")){
            //System.out.println("LIST PRICE VALUE NOT FOUND");
            //elementText = reader.extractElementByClassText("price bxgy-item-price");
            //elementText = reader.extractElementText("actualPriceExtraMessaging");
        }
        String price = elementText + " USD";
        book.setPrice(price);
        
        return book;
    }//loadBookFromAmazon
    
    /* ------- BOX PACKING ------- */
    //this is gonna be a hard one
    private static Box[] packBooks(Book[] books, int numberOfBooks){
        return new Box[0];
    }//packBooks
}//end of class: Book Packer
