package app;

import java.util.ArrayList;

public class Packer {

	private ArrayList<Book> books;
	public static final int MAX_WEIGHT = 100; //Max weight is scaled by a factor of 10 to remove decimals
	
	public Packer(Book[] books) {
		
		//Convert books array to an array list to remove books from the list more easily
		this.books = new ArrayList<Book>();
		for(Book current : books) {
			this.books.add(current);
		}
	}
	
	public ArrayList<Box> packBooks() {
		
		ArrayList<Box> boxes = new ArrayList<>();
		
		//Optimally pack each box until no books are left to pack
		int box_id = 1;
		while(books.size() > 0) {
			
			int[][] V = new int[books.size()+1][MAX_WEIGHT+1];
			boolean[][] keep = new boolean[books.size()+1][MAX_WEIGHT+1];
			
			//Knapsack algorithm used here to determine the max number of books that will fit into the current box
			for(int i = 1; i <= books.size(); i ++) {
				
				for(int w = 0; w <= MAX_WEIGHT; w ++) {
					
					if(books.get(i-1).getWeight() <= w && (1+V[i-1][w-books.get(i-1).getWeight()] > V[i-1][w])) {
						V[i][w] = 1 + V[i-1][w-books.get(i-1).getWeight()];
						keep[i][w] = true;
					} else {
						
						V[i][w] = V[i-1][w];
						keep[i][w] = false;
					}
				}
			}
		
			//Use the "keep" array to find out which specific books must go into the current box to achieve the max number
			int K = MAX_WEIGHT;
			double box_weight = 0.0;
			int max = V[books.size()][MAX_WEIGHT];
			
			Book[] box_contents = new Book[max];
			int boxIndex = 0;
			for(int i = books.size(); i >= 0; i --) {
				
				if(keep[i][K]) {
					
					box_weight += books.get(i-1).getWeight()*1.0/10.0;
					box_contents[boxIndex++] = books.get(i-1);
					K = K - books.get(i-1).getWeight();
					books.remove(i-1);
				}
					
			}
			
			//Round box weight to one decimal place
			int scale = (int) Math.pow(10, 1);
		    box_weight =  (double) Math.round(box_weight * scale) / scale;
			
			BoxInfo newBoxInfo = new BoxInfo(box_id++, box_weight, box_contents);
			Box newBox = new Box(newBoxInfo);
			boxes.add(newBox);
		}	
		
		return boxes;
	}
}
