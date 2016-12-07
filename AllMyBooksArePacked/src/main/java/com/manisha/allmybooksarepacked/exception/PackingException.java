/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.manisha.allmybooksarepacked.exception;

/**
 *
 * @author ManishaYeramareddy
 */
public class PackingException extends Exception {
    
    public PackingException(String message) {
        super(message);
    }

    public PackingException(String message, Throwable throwable) {
        super(message, throwable);
    }
    
}
