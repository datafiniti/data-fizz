package application;

/**
 * A Book specifies information about a given physical book. This information
 * includes title, author, price, shipping weight, and ISBN-10 number.
 * @author Greg McDonald
 *
 */
public class Book {
    private String title;
    private String author;
    private String price;
    private String shipping_weight;
    /* Storing ISBN-10 as non-string is a bad idea, 
     * as it "forgets" 0's or X's at the start/end of the ISBN.
     * However, this is how the spec requires it be implemented. 
     * A better solution would be to use a String.*/
    private long isbn10;
    
    /**
     * Constructs a Book with default title, author, price, shipping weight,
     *  and invalid ISBN10.
     */
    public Book(){
        this("No Title", "No Author", "No Price", "No Shipping Weight", -1);
    }//default constructor
    
    /**
     * Constructs a Book with the specified title, author, price, shipping weight
     * and ISBN-10.
     */
    public Book(String title, String author, String price, String shipping_weight, long isbn10){
        setTitle(title);
        setAuthor(author);
        setPrice(price);
        setShippingWeight(shipping_weight);
        setISBN10(isbn10);
    }//complete constructor
    
    /* ------- STATIC METHODS ------- */
    /**Parses the decimal weight value from the shipping weight string
     * stored in the specified Book.
     * @param book the Book to parse the weight from.
     * @return the weight of the Book in double precision.
     */
    public static double parseBookWeight(Book book){
        //Get shipping weight, contained in string
        String weightString = book.getShippingWeight();
        
        double weightNumber = 0;
        try{
            //Gets rid of "pounds" at end of weight string
            int endOfWeightIndex = weightString.indexOf(' ');
            String weightNumberString = weightString.substring(0, endOfWeightIndex);
            //Parse out the weight, then return it
            weightNumber = Double.parseDouble(weightNumberString);
            return weightNumber;
        }//try parse operation
        catch(Exception e){
            return 0;
        }//catch exceptions, doesn't handle them
    }//parseBookWeight
    
    /* ------- General Methods? ------- */
    @Override
    public boolean equals(Object arg){
        if(arg instanceof Book){
            Book otherBook = (Book)arg;
            boolean sameTitle = this.getTitle().equals(otherBook.getTitle());
            boolean sameAuthor = this.getAuthor().equals(otherBook.getAuthor());
            boolean samePrice = this.getPrice().equals(otherBook.getPrice());
            boolean sameShippingWeight = this.getShippingWeight().equals(otherBook.getShippingWeight());
            boolean sameISBN10 = this.getISBN10() == otherBook.getISBN10();
            
            boolean equalStatus = sameTitle & sameAuthor & samePrice 
                                  & sameShippingWeight & sameISBN10;
            return equalStatus;
        }
        else{
            return false;
        }//object is of non-Book type
    }//equals
    
    @Override
    public String toString(){
        return getTitle() + ": " + getAuthor() + ": " + getPrice() + ": "
               + getShippingWeight() + ": " + getISBN10(); 
    }//toString
    
    /* ------- MUTATORS ------- */
    /** Sets the title of this Book to the specified title.
     * @param title
     * @return whether the set title operation was successful.
     */
    public boolean setTitle(String title){
        this.title = title;
        return true;
    }//setTitle
    
    /** Sets the author of this Book to the specified author.
     * @param author
     * @return whether the set author operation was successful.
     */
    public boolean setAuthor(String author){
        this.author = author;
        return true;
    }//setAuthor
    
    /** Sets the price of this Book to the specified price.
     * @param price
     * @return whether the set price operation was successful.
     */
    public boolean setPrice(String price){
        this.price = price;
        return true;
    }//setPrice
    
    /** Sets the shipping weight of this Book to the specified shipping weight.
     * @param shipping_weight
     * @return whether the set shipping weight operation was successful.
     */
    public boolean setShippingWeight(String shipping_weight){
        this.shipping_weight = shipping_weight;
        return true;
    }//setShippingWeight
    
    /** Sets the ISBN-10 of this Book to the specified ISBN-10.
     * @param isbn10
     * @return whether the set ISBN-10 operation was successful.
     */
    public boolean setISBN10(long isbn10){
        this.isbn10 = isbn10;
        return true;
    }//setISBN10
    
    /* ------- ACCESSORS ------- */
    /**Returns the title of this Book.
     * @return the title of this Book.
     */
    public String getTitle(){
        return title;
    }//getTitle
    
    /**Returns the author of this Book.
     * @return the author of this Book.
     */
    public String getAuthor(){
        return author;
    }//getAuthor
    
    /**Returns the price of this Book.
     * @return the price of this Book.
     */
    public String getPrice(){
        return price;
    }//getPrice
    
    /**Returns the shipping weight of this Book.
     * @return the shipping weight of this Book.
     */
    public String getShippingWeight(){
        return shipping_weight;
    }//getShippingWeight
    
    /**Returns the ISBN-10 of this Book.
     * @return the ISBN-10 of this Book.
     */
    public long getISBN10(){
        return isbn10;
    }//getISBN10
}//end of class: book
