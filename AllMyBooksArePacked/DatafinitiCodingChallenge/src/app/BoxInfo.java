package app;

public class BoxInfo {

	private int id;
	private String totalWeight;
	private Book[] contents;
	
	public BoxInfo(int id, double totalWeight, Book[] contents) {
		
		this.id = id;
		this.totalWeight = Double.toString(totalWeight) + " pounds";
		this.contents = contents;
	}
}
