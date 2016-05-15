/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.manisha.allmybooksarepacked.db.entity;

import java.util.List;

/**
 *
 * @author ManishaYeramareddy
 */
public class Box {
    
    //uuid might be better?
    private Long id;
    private Double maxWeight;
    private Double totalWeight;
    private List<Book> books;
    
    public Box(Double max) {
        this.maxWeight = max;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(Double totalWeight) {
        this.totalWeight = totalWeight;
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
    
    public Boolean isFull() {
        return totalWeight >= maxWeight;
    }
    
    public Boolean canFit(Double weight) {
        return maxWeight >= (totalWeight+weight);
    }
 
}
