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
        List<Box> boxes = new ArrayList<>();
        Long boxId = 1L;
        
        Box box = new Box(boxMaxWeight, boxId);
        for(Book b : booksToPack) { //go through unpacked books
            if(!b.isPacked()) {                     
                if(!box.canFit(b.getShippingWeight())) { //too much 
                    boxes.add(box); //put current box aside
                    boxId = boxId + 1;
                    box = new Box(boxMaxWeight, boxId); //get a new box
                }
                box.addBook(b);
                b.setIsPacked(Boolean.TRUE);
            }                
        }
        return boxes;
    }
    
    public List<Box> packInNBoxes(Integer numOfBoxes) throws PackingException {
        if( numOfBoxes*boxMaxWeight < totalBooksWeight) {
            throw new PackingException("Not enough boxes given the weight constraint of each box");
        }
        
        List<Box> boxes = new ArrayList<>();
        
        return boxes;
    }
    
    public static void main(String[] args) throws PackingException, IOException  {
        BookPackager packager = new BookPackager();
        List<Box> boxes = packager.packInLeastNumberOfBoxes();
        System.out.println("JSON\n"+JSONUtils.objectToJSON(boxes));
        
    }
    
}
