public class Book{
  public String title;
  public String author;
  public String price;
  public String weight;
  public String isbn; 
  
  /**
   * Constructor
   * Every book element needs to contain these five fields
   */
  public Book(String title, String author, String price, String weight, String isbn){
    this.title = title;
    this.author = author;
    this.price = price;
    this.weight = weight;
    this.isbn = isbn;
  }
}