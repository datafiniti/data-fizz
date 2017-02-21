package application;

/**A Box specifies a collection of Book objects with a total weight.
 * Each Box object also stores an ID for (potential) sorting/identification.
 * 
 * @author Greg McDonald
 *
 */
public class Box {
    private int id; //INTEGER PRIMARY KEY?
    private double totalWeight;
    private Book[] contents;
    
    /** Constructs a new Box whose ID is specified by the given ID.
     * @param id the ID of the new Box.
     */
    public Box(int id){
        setID(id);
        totalWeight = 0;
        contents = new Book[0];
    }//complete constructor
    
    /* ------- Adding Books to Boxes -------*/
    /**Attempts to add the specified book to the contents of the Box.
     * @param book the Book to attempt to add to this Box.
     * @return whether the add book operation was successful.
     */
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
    /** Sets the ID of this Box to the specified ID.
     * @param id
     * @return whether the set ID operation was successful.
     */
    public boolean setID(int id){
        this.id = id;
        return true;
    }//setID
    
    /* ------- ACCESSORS ------- */
    /**Returns the ID of this Box.
     * @return the ID of this Box.
     */
    public int getID(){
        return id;
    }//getID
    
    /**Returns the total weight of this Box.
     * @return the total weight of this Box.
     */
    public double getTotalWeight(){
        return totalWeight;
    }//getTotalWeight
    
    /**Returns the contents of this Box as a Book[].
     * @return the contents of this Box.
     */
    public Book[] getContents(){
        return contents;
    }//getContents
}//end of class: Box
