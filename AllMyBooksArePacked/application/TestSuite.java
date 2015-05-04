package application;

public class TestSuite {
    
    private static final boolean DEBUG = true;
    
    public static void main(String[] args){
        //Testing Book Functionality
        debugPrint("TEST SECTION: Book function\n");
        testBookDefaultConstructor();
        //Testing Box Functionality
    }
    
    /* --- Testing Sections --- */
    //Book Function
    private static void testBookDefaultConstructor(){
        debugPrint("Default constructor test... ");
        Book test = new Book();
        assertEquals(test.getTitle(), "No Title");
        assertEquals(test.getAuthor(), "No Author");
        assertEquals(test.getPrice(), "No Price");
        assertEquals(test.getShippingWeight(), "No Shipping Weight");
        assertEquals(test.getISBN10(), -1);
        
        debugPrint("complete\n");
    }//testBookDefaultConstructor
    
    /*------- Test Helper Methods -------*/
    private static void assertEquals(Object arg0, Object arg1){
        try{
            assert arg0.equals(arg1);
        }
        catch(AssertionError ae){
            System.out.println();
            System.out.println("!!! FAILED TO ASSERT: " + arg0.toString() + " EQUAL TO " + arg1.toString());
        }
    }//assert equals
    
    private static void debugPrint(String text){
        if(DEBUG){
            System.out.print(text);
        }//if debug is true, print
    }//debugPrint
}//end class TestSuite

