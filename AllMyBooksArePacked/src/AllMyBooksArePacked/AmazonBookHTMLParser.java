package AllMyBooksArePacked;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

class BookHTMLParser {
	
	public static void main(String args[]) throws FileNotFoundException, IOException{
		//put all the HTML files in a folder then reference that directory
		File bookPageFolder = new File("C:/Users/Brandon/workspace/DataFizz/AllMyBooksArePacked/Amazon_BookWebPages");
		File[] listOfBookEntries = bookPageFolder.listFiles();
		
		//looking for 5 relevant lines or information in any order
		String[] fileLines = new String[5];
		
		BookCollection bookCollection = new BookCollection(); 
		
		String title;
		String author;
		String price;
		String weight;
		String isbn;
		
		//know where to reference needed info in fileLines array
		int titleIndex = -1;
		int authorIndex = -1;
		int priceIndex = -1;
		int weightIndex = -1;
		int isbnIndex = -1;
		
		for(File bookEntry : listOfBookEntries){
			 try (BufferedReader reader = new BufferedReader(new FileReader(bookEntry))) {
				 
				 title = "";
				 author = "";
				 price = "";
				 weight = "";
				 isbn = "";
				 
				 int i = 0;
				 String line;
				 while((line = reader.readLine()) != null){ 
					 
					 //Get the line containing the author
					 if(line.contains("(Author)")       ||
						line.contains("(Introduction)") ||
						line.contains("(Editor)"))        {
					
						fileLines[i] = line;
						authorIndex = i;
						i++;
					 }
					 
					 //Get the line containing the title
					 if(line.contains("<title>")){			 
					    fileLines[i] = line;
					    titleIndex = i;
					    i++;
				     }	
					 
					 //Get the line containing the price
					 if(line.contains("actualPriceContent")) {
						 fileLines[i] = line;
						 priceIndex = i;
						 i++;
					 }else if(line.contains("Buy New") && line.contains("rentalPriceLabel")){
						 line = reader.readLine();
						 if(line.contains("price") || line.contains("Price")){
						    fileLines[i] = line;
						 	priceIndex = i;
						 	i++;
					 	 }
					 }
					 
					 //Get the line containing the shipping weight
					 if(line.contains("Shipping Weight")) {
						 fileLines[i] = line;
						 weightIndex = i;
						 i++;
					 }
					 
					 //Get the line containing the ISBN-10 number
					 if(line.contains("ISBN-10") && line.contains("<li>")){
						 fileLines[i] = line;
						 isbnIndex = i;
						 i++;
					 }
				 }
				 
				 author = getAuthor(fileLines[authorIndex]);
				 title = getTitle(fileLines[titleIndex], author);
				 price = getPrice(fileLines[priceIndex]);
				 weight = getWeight(fileLines[weightIndex]);
				 isbn = getISBN(fileLines[isbnIndex]);
				 
				 BookRecord newBookEntry = new BookRecord(title, author, price, weight, isbn);
				 bookCollection.addBookToCollection(newBookEntry);
				 
			 }
		}
		
		//quick sort all the books to an ascending order by weight for easy boxing
		bookCollection.collectionQuickSort(0, bookCollection.getBookCollection().size() - 1);
		BoxesForShipping boxesToShip = bookCollection.prepareBooksForShipping();
		boxesToShip.outPutOrderToJSON();	
	}

	//gets the author out of a passed line
	public static String getAuthor(String line){	
		int[] authorFlag = {0 , 0};
		String authorWithPercent = "";
		String authorWithURL = "";
		
		//finds the author based on the first of two uniform ways
		//defined by the HTML
		if(line.contains("author=") && line.contains("&amp")){
			int authorWithPercentStartIndex = line.indexOf("author=");
			int authorWithPercentEndIndex = line.indexOf("&amp", authorWithPercentStartIndex);
		    authorWithPercent = line.substring(authorWithPercentStartIndex, authorWithPercentEndIndex);
			authorWithPercent = authorWithPercent.replace("author=", "");
			authorWithPercent = authorWithPercent.replace("%20"," ");
			authorFlag[0] = 1;
		}

		//find the author based on the second of two uniform ways
		//defined by the HTML
		if(line.contains("www.amazon.com")){
			int authorWithURLstartIndex = line.indexOf("www.amazon.com");
			int authorWithURLendIndex = line.indexOf(">");
			authorWithURL = line.substring(authorWithURLstartIndex, authorWithURLendIndex);
			String[] authorWithURLArray = authorWithURL.split("/");
			authorWithURL = authorWithURLArray[1];
			authorWithURL = authorWithURL.replace("-", " ");
			authorFlag[1] = 1;
		}
		
		//A line may contain both or only one author so handles accordingly
		if(authorFlag[0] == 1 && authorFlag[1] == 0){
			return authorWithPercent;
		}else if(authorFlag[0] == 0 && authorFlag[1] == 1){
			return authorWithURL;
		}if(authorFlag[0] == 1 && authorFlag[1] == 1){
			return authorWithPercent + ", " + authorWithURL;
		}else{
			return "Author Not Found.";
		}
	}
	
	//gets the title of a book out of the passed line
	public static String getTitle(String line, String author){
		String titleTemp = "";
		String title = "";
		String[] titleSplit;
		
		//grab one of the authors out of a collective work
		if(author.contains(", ")){
			String[] authorSplit = author.split(", ");
			author = authorSplit[0];
		}
		
		//split the line into parts designated by ":" in the HTML
		//and cut off the HTML tags
		titleTemp = line;
		titleTemp = titleTemp.replace("<title>", "");
		titleTemp = titleTemp.replace("</title>", "");
		titleSplit = titleTemp.split(":");
		
		//connect the parts of it that do not contain the author 
		//to obtain the title
		int titlePiece = 0;
		while(title == ""){ //considers if the author is in the first part of title
			if(titlePiece > 0){title = title + titleSplit[titlePiece - 1];}
			while(!(titleSplit[titlePiece].contains(author)) && titlePiece < titleSplit.length - 1){
				title = title + titleSplit[titlePiece];
				titlePiece++;
			}
			titlePiece++;
		}
		
		//fix apostrophe mishap
		if(title.contains("&#39;")){
			title = title.replace("&#39;", "'");
		}
		
		//Makes sure amazon.com isn't in the title
		if(title.contains("Amazon.com") || title.contains("amazon.com")){
			title = title.replace("Amazon.com", "");
			title = title.replace("amazon.com", "");
		}
		
		title = title.trim();
		return title;
	}
	
	//gets the price out of a passed line
	public static String getPrice(String line){
		int moneyStartIndex = line.indexOf("$");
		int moneyEndIndex = line.indexOf("<", moneyStartIndex);
		String price = line.substring(moneyStartIndex, moneyEndIndex);
		return price;
	}
	
	//gets the ISBN number out of a passed line
	public static String getISBN(String line){
		int isbnStartIndex = line.indexOf("</b>");
		int isbnStopIndex = line.indexOf("</li>");
		String isbn = line.substring(isbnStartIndex, isbnStopIndex);
		isbn = isbn.replace("</b>", "");
		isbn = isbn.trim();		
		return isbn;
	}
	
	//gets the weight out of a passed line
	public static String getWeight(String line){
		int weightStartIndex = line.indexOf("</b>");
		int weightStopIndex = line.indexOf("(", weightStartIndex);
		
		String weight = line.substring(weightStartIndex, weightStopIndex);
		weight = weight.replace("</b>", "");
		weight = weight.trim();
		
		return weight;
	}
}