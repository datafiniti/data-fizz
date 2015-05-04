package application;

public class Book {
    private String title;
    private String author;
    private String price;
    private String shipping_weight;
    private int isbn10;
    
    public Book(){
        this("No Title", "No Author", "No Price", "No Shipping Weight", -1);
    }//default constructor
    
    public Book(String title, String author, String price, String shipping_weight, int isbn10){
        setTitle(title);
        setAuthor(author);
        setPrice(price);
        setShippingWeight(shipping_weight);
        setISBN10(isbn10);
    }//complete constructor
    
    /* ------- Mutators ------- */
    public boolean setTitle(String title){
        this.title = title;
        return true;
    }//setTitle
    
    public boolean setAuthor(String author){
        this.author = author;
        return true;
    }//setAuthor
    
    public boolean setPrice(String price){
        this.price = price;
        return true;
    }//setPrice
    
    public boolean setShippingWeight(String shipping_weight){
        this.shipping_weight = shipping_weight;
        return true;
    }//setShippingWeight
    
    public boolean setISBN10(int isbn10){
        this.isbn10 = isbn10;
        return true;
    }//setISBN10
    
    /* ------- Accessors ------- */
    public String getTitle(){
        return title;
    }//getTitle
    
    public String getAuthor(){
        return author;
    }//getAuthor
    
    public String getPrice(){
        return price;
    }//getPrice
    
    public String getShippingWeight(){
        return shipping_weight;
    }//getShippingWeight
    
    public int getISBN10(){
        return isbn10;
    }//getISBN10
}//end of class: book
