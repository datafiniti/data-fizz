/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.manisha.allmybooksarepacked.db.entity;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ManishaYeramareddy
 */
@JsonTypeInfo(include=As.WRAPPER_OBJECT, use=Id.NAME)
@JsonRootName(value = "Box")
public class Box {
    
    //uuid might be better?
    private Long id;
    private Double maxWeight;
    private Double currentWeight = 0.0;
    private List<Book> books = new ArrayList<>();
    
    public Box(Double max, Long id) {
        this.id = id;
        this.maxWeight = max;
    }
    
    public void addBook(Book b) {
        this.books.add(b);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getCurrentWeight() {
        return currentWeight;
    }

    public void setCurrentWeight(Double currentWeight) {
        this.currentWeight = currentWeight;
    }

    public Double getMaxWeight() {
        return maxWeight;
    }
    
    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }
 
    public Boolean canFit(Double weight) {
        return maxWeight >= (currentWeight+weight);
    }
 
}
