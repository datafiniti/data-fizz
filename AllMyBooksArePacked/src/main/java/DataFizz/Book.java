package DataFizz;

public class Book {

    private String Title;
    private String Author;
    private Double Price;
    private Double shippingWeight;
    private String IsbnNumber;

    public Book(Double price, String title, String author, Double weight, String isbnNumber)
    {
        this.Author = author;
        this.IsbnNumber = isbnNumber;
        this.Price = price;
        this.Title = title;
        this.shippingWeight = weight;
    }
    public String getTitle()
    {
        return Title;
    }
    public String getAuthor()
    {
        return Author;
    }
    public Double getPrice()
    {
        return Price;
    }
    public Double getShippingWeight()
    {
        return shippingWeight;
    }
    public String getIsbnNumber()
    {
        return IsbnNumber;
    }

    @Override
    public String toString()
    {
        return "Book{" + "title=" + Title + ", author=" + Author + ", price=" + "$" + Price + " USD" + ", shippingWeight=" + shippingWeight + " pounds" + ", isbn10=" + IsbnNumber;
    }
}
