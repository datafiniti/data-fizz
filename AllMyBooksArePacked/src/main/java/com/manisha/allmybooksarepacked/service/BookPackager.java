/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.manisha.allmybooksarepacked.service;

import com.manisha.allmybooksarepacked.db.entity.Book;
import com.manisha.allmybooksarepacked.db.entity.Box;
import com.manisha.allmybooksarepacked.exception.PackingException;
import com.manisha.allmybooksarepacked.utility.JSONUtils;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 *
 * @author ManishaYeramareddy
 */

//CONSTRUCTOR : gets all the books to pack (ideally should be from db? with a non-packed flag), 
//              and gets the total weight of those books.

public class BookPackager {
    
    private static Integer N_BOXES = 15;
    private String mainFilePath = "com/manisha/allmybooksarepacked/data/book";
    private Double boxMaxWeight = 10.0;
    
    private List<Book> booksToPack = new ArrayList<>();
    private Double totalBooksWeight = 0.0;
    
    protected Double getBoxMaxWeight() {
        return boxMaxWeight;
    }

    protected List<Book> getBooksToPack() {
        return booksToPack;
    }

    protected Double getTotalBooksWeight() {
        return totalBooksWeight;
    }
    
    public BookPackager() {
        getAllBooks();
    }
 
    private void getAllBooks() {  
        
        for(int i=1; i<=20; i++) {
            try {
                Book b = getBookFromFile(mainFilePath+i+".html");
                totalBooksWeight += b.getShippingWeight();
                booksToPack.add(b);
            } catch(Exception ex) {
                System.out.println("Error for file: "+i+" -- "+ex.getLocalizedMessage());
                ex.printStackTrace(); 
            }
        }
        
        booksToPack = sortBooksByWeight(false);
    }
    
    private Book getBookFromFile(String file) throws IOException {
        return new BookParser(file).getBook();
    }
    
    private List<Book> sortBooksByWeight(final boolean ascending) {
        List<Book> sortedBooks = new ArrayList<>(booksToPack);
        Collections.sort(sortedBooks, new Comparator<Book>() {
            @Override
            public int compare(Book d1, Book d2) {
                return d1.getShippingWeight().compareTo(d2.getShippingWeight()) * (ascending?1:-1);
            }
        });
        return sortedBooks;
    }
      
    public List<Box> packInLeastNumberOfBoxes() {
        System.out.println("NUMBER OF BOOKS TO PACK: "+booksToPack.size());
        List<Box> boxes = new ArrayList<>();
        Long boxId = 1L;  
        boxes.add(new Box(boxMaxWeight, boxId));

        for(Book b : booksToPack) { //get a book
            for(Box oldBox : boxes) { //see if it can fit in an existing box
                if(oldBox.canFit(b.getShippingWeight())) {
                    oldBox.addBook(b);
                    b.setIsPacked(true);
                    break;
                }
            }
            if(!b.isPacked()) { //if not, get a new box
                boxId = boxId + 1;
                Box nwBox = new Box(boxMaxWeight, boxId);
                nwBox.addBook(b); b.setIsPacked(true);
                boxes.add(nwBox);
            }
        }
        return boxes;
    }
    
    public List<Box> divideAmongNBoxes(Integer numOfBoxes) throws PackingException {
        if( numOfBoxes*boxMaxWeight < totalBooksWeight) {
            throw new PackingException("Not enough boxes given the weight constraint of each box");
        }
        
        //Get n boxes
        List<Box> nBoxes = new ArrayList<>();
        for(Integer i=1; i<=numOfBoxes; i++) {
            Box x = new Box(boxMaxWeight, i.longValue());
            nBoxes.add(x);
        }
        
        int onBox = 0;
        //'pigeonhole pinciple' the books into n boxes
        for(Book b : booksToPack) {            
            while(!b.isPacked()) { //while its not packed
                Box x = nBoxes.get(onBox); //get the next box
                if(x.canFit(b.getShippingWeight())) { //if it fits, pack it
                    x.addBook(b);
                    b.setIsPacked(true);
                }
                onBox = onBox + 1; //onto the next box
                if(onBox >= nBoxes.size()) {
                    onBox = 0;
                }
            }           
        }
        return nBoxes;
    }
    
    public static void main(String[] args) throws PackingException, IOException  {
        BookPackager packager = new BookPackager();
        
        //Pack into least possible number of boxes given weight constraint
        /*List<Box> leastNumOfBoxes = packager.packInLeastNumberOfBoxes();
        System.out.println("leastNumOfBoxes: "+leastNumOfBoxes.size());
        System.out.println("JSON\n"+JSONUtils.objectToJSON(leastNumOfBoxes));*/
        
        //Divide these twenty books into N boxes for shipping with each box having no more than ten pounds of books
        List<Box> nboxes = packager.divideAmongNBoxes(N_BOXES);
        System.out.println("JSON - \n"+JSONUtils.objectToJSON(nboxes));
        
    }
    
}
