package AllMyBooksArePacked;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.ArrayList;

public class BoxesForShipping {
	
	private ArrayList<SingleBookBox> boxList;
	private int boxCount;
	
	public BoxesForShipping() {
		boxList = new ArrayList<SingleBookBox>();
		boxCount = 0;
	}
	
	public void addBoxToOrder(SingleBookBox box){
		boxList.add(box);
		boxCount++;
	}
	
	//getters and setters
	public int getBoxCount(){return this.boxCount;}
	
	public void outPutOrderToJSON() throws FileNotFoundException{
		int boxId;
		
		PrintStream console = System.out;
		File file = new File("AmazonBookOrder.JSON");
		FileOutputStream fos = new FileOutputStream(file);
		PrintStream ps = new PrintStream(fos);
		System.setOut(ps);
		
		System.out.println("{");
		for(boxId = 0; boxId <= boxList.size() - 1; boxId++){
			
			
		
			System.out.println("\t\"box\": {");
			System.out.println("\t\t\"id\": " + (boxId + 1));
			System.out.printf("\t\t\"totalWeight\": %.2f\n", boxList.get(boxId).getActualBoxWeight());
			
			int bookInBox;
			for(bookInBox = 0; bookInBox < boxList.get(boxId).getBoxBookCount(); bookInBox++){
				System.out.println("\t\t\"contents\": [");
				System.out.println("\t\t\t{");
				
				BookRecord currentBook = boxList.get(boxId).getBooksInBox().get(bookInBox);
				String title = currentBook.getBookTitle();
				String author =  currentBook.getBookAuthor();
				String price = currentBook.getBookPriceAsString();
				String weight = currentBook.getBookShipWeightAsString();
				String isbn =  currentBook.getBookISBN();
				
				System.out.println("\t\t\t\t\"title\": " + title);
				System.out.println("\t\t\t\t\"author\": " + author);
				System.out.println("\t\t\t\t\"price\": " + price);
				System.out.println("\t\t\t\t\"shipping_weight\": " + weight);
				System.out.println("\t\t\t\t\"isbn-10\": " + isbn);
				
				System.out.println("\t\t\t}");
				System.out.println("\t\t]");
			}
			System.out.println("\t}");
		}
		System.out.println("}");
		System.setOut(console);
	}
}

