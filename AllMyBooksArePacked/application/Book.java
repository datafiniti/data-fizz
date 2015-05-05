package application;

public class Book {
    private String title;
    private String author;
    private String price;
    private String shipping_weight;
    private long isbn10;
    
    public Book(){
        this("No Title", "No Author", "No Price", "No Shipping Weight", -1);
    }//default constructor
    
    public Book(String title, String author, String price, String shipping_weight, long isbn10){
        setTitle(title);
        setAuthor(author);
        setPrice(price);
        setShippingWeight(shipping_weight);
        setISBN10(isbn10);
    }//complete constructor
    
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
    
    /* ------- MUTATORS ------- */
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
    
    public boolean setISBN10(long isbn10){
        this.isbn10 = isbn10;
        return true;
    }//setISBN10
    
    /* ------- ACCESSORS ------- */
    
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
    
    public long getISBN10(){
        return isbn10;
    }//getISBN10
}//end of class: book
