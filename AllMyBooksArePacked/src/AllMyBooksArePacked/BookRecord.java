package AllMyBooksArePacked;


public class BookRecord {
	private String title;
	private String author;
	private String price;
	private String shipWeight;
	private String isbn10;
	
	
	
	public BookRecord(String title, String author, String price, String shipWeight, String isbn10) {
		this.title = title;
		this.author = author;
		this.price = price;
		this.shipWeight = shipWeight;
		this.isbn10 = isbn10;
	}
	
	
	//getter and setters
	public String getBookTitle(){return this.title;}
	public String getBookAuthor(){return this.author;}
	public String getBookPriceAsString(){return this.price;}
	public String getBookShipWeightAsString(){return this.shipWeight;}
	public String getBookISBN(){return this.isbn10;}
	public double getPriceAsDouble(){
		String stringPrice = price.replace("$", "");
		stringPrice = stringPrice.trim();
		double numPrice = Double.parseDouble(stringPrice);
		return numPrice;
	}
	public double getBookWeightAsDouble(){
		String stringWeight = shipWeight.replace("pounds", "");
		stringWeight = stringWeight.trim();
		double numWeight = Double.parseDouble(stringWeight);
		return numWeight;
	}
	
}