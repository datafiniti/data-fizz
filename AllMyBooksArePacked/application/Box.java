package application;

public class Box {
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
        if(book != null){
            insertBookIntoContents(book);
            totalWeight = calculateBoxWeight();
            return true;
        }//book exists, can be added
        else{
            return false;
        }//book is invalid
    }//addBook
    
    /* ------- HELPER METHODS ------- */
    /** Mimics ArrayList adding behavior.
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
                double currentItemWeight = Book.parseBookWeight(contents[i]);
                //add weight to current count
                weight += currentItemWeight;
            }//if the current item isn't null
        }//for every book in contents
        
        return weight;
    }//calculateBoxWeight
    
    /* ------- GENERAL METHODS ------- */
    @Override
    public String toString(){
        String stringRepresentation = "ID: " + id + " Total Weight: " + totalWeight + "\n";
        for(int i = 0; i < contents.length; i++){
            stringRepresentation += contents[i].toString() + "\n";
        }//for all books this box contains
        
        return stringRepresentation;
    }//toString
    
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
