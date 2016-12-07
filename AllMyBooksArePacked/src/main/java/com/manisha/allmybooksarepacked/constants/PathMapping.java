/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.manisha.allmybooksarepacked.constants;

/**
 *
 * @author ManishaYeramareddy
 */
public class PathMapping {
    
    /*ideally SHOULD BE CONFIGURABLE*/
    
    public static String TITLE = "#btAsinTitle";
    public static String AUTHOR = "div.buying span a";
    public static String PUBLISHER = "table#productDetailsTable tr td.bucket div.content > ul > li:contains(Publisher)";
    public static String WEIGHT = "table#productDetailsTable tr td.bucket div.content > ul > li:contains(Shipping Weight)";
    public static String LANGUAGE = "table#productDetailsTable tr td.bucket div.content > ul > li:contains(Language)";
    public static String ISBN_10 = "table#productDetailsTable tr td.bucket div.content > ul > li:contains(ISBN-10)";
    public static String PRICE = "table.product tr#actualPriceRow td#actualPriceContent span#actualPriceValue b.priceLarge";
    public static String PAGES_HARDCOVER = "table#productDetailsTable tr td.bucket div.content > ul > li:contains(Hardcover)";
    public static String PAGES_PAPERBACK = "table#productDetailsTable tr td.bucket div.content > ul > li:contains(Paperback)";

}
