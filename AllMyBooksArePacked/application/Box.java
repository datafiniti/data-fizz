package application;

public class Box {
    
    public static final int MAX_BOX_WEIGHT = 10;
    
    private int id; //INTEGER PRIMARY KEY?
    private double totalWeight;
    private Book[] contents;
    
    public Box(int id){
        setID(id);
        totalWeight = 0;
        contents = new Book[0];
    }//complete constructor
    
    /* ------- Adding Books to Boxes -------*/
    public boolean addBook(Book book){
        //Calculate if box becomes full after new book
        double newBookWeight = getBookWeight(book);
        if(totalWeight + newBookWeight <= MAX_BOX_WEIGHT){
            insertBookIntoContents(book);
            totalWeight = calculateBoxWeight(); //update total weight if success
            return true;
        }//
        else{
            return false;
        }//else book exceeds weight limit
    }//addBook
    
    /* ------- HELPER METHODS ------- */
    
    /** Mimics ArrayList adding behavior.
     * 
     * @param book The Book object to insert into contents
     */
    private void insertBookIntoContents(Book book){
        //Make the contents array one bigger
        Book[] updatedContents = new Book[contents.length + 1];
        //Insert all previous books into new array
        for(int i = 0; i < contents.length; i++){
            updatedContents[i] = contents[i];
        }//for every old book
        //Makes the final element of contents the new book
        updatedContents[updatedContents.length - 1] = book;
        contents = updatedContents;
    }//insertBookIntoContents
    
    private double calculateBoxWeight(){
        double weight = 0;
        for(int i = 0; i < contents.length; i++){
            if(contents[i] != null){
                //Gets the book weight in pounds* (maybe not always pounds?)
                double currentItemWeight = getBookWeight(contents[i]);
                //add weight to current count
                weight += currentItemWeight;
            }//if the current item isn't null
        }//for every book in contents
        
        return weight;
    }//calculateTotalWeight
    
    //Considering making this a static method in the Book class.
    private double getBookWeight(Book book){
        //Get shipping weight, contained in string
        String weightString = book.getShippingWeight();
        
        double weightNumber = 0;
        try{
            //Gets rid of "pounds" at end of weight string
            int endOfWeightIndex = weightString.indexOf(' ');
            String weightNumberString = weightString.substring(0, endOfWeightIndex);
            //Parse out the weight, then return it
            weightNumber = Double.parseDouble(weightNumberString);
            return weightNumber;
        }//try parse operation
        catch(Exception e){
            return 0;
        }//catch exceptions, doesn't handle them yet
    }//parseWeight
    
    /* ------- MUTATORS ------- */
    public boolean setID(int id){
        this.id = id;
        return true;
    }//setID
    
    /* ------- ACCESSORS ------- */
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
