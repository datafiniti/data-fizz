package application;

public class Box {
    private int id; //INTEGER PRIMARY KEY?
    private double totalWeight;
    private Book[] contents;
    
    public Box(){
        this(-1);
    }//default constructor
    
    public Box(int id){
        setID(id);
        totalWeight = -1;
        contents = new Book[20];
    }//complete constructor
    
    /* ------- Adding Books to Boxes -------*/
    public boolean addBook(Book book){
        //Calculate if box becomes full after new book
        //Behave accordingly, return boolean indicates success
        totalWeight = calculateTotalWeight(); //update total weight if success
        return true;
    }
    
    private double calculateTotalWeight(){
        double weight = 0;
        for(int i = 0; i < contents.length; i++){
            if(contents[i] != null){
                String currentItemWeightAsString = contents[i].getShippingWeight();
                double currentItemWeight = parseWeight(currentItemWeightAsString);
                weight += currentItemWeight;
            }//if the current item isn't null
        }//for every book in contents
        return weight;
    }//calculateTotalWeight
    
    private double parseWeight(String weightString){
        double weightNumber = -1;
        try{
            int endOfWeightIndex = weightString.indexOf(' ');
            String weightNumberString = weightString.substring(0, endOfWeightIndex);
            weightNumber = Double.parseDouble(weightNumberString);
            return weightNumber;
        }//try parse operation
        catch(Exception e){
            return -1;
        }//catch exceptions, doesn't handle them yet
    }//parseWeight
    
    /* ------- Mutators ------- */
    public boolean setID(int id){
        this.id = id;
        return true;
    }//setID
    
    /* ------- Accessors ------- */
    public int getID(){
        return id;
    }//getID
    
    public double getTotalWeight(){
        return totalWeight;
    }//getTotalWeight
    
    public Book[] getContents(){
        return contents;
    }//getContents
}//end of class: Box
