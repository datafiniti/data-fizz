/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.manisha.allmybooksarepacked.service;

import com.manisha.allmybooksarepacked.constants.PathMapping;
import com.manisha.allmybooksarepacked.db.entity.Book;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

/**
 *
 * @author ManishaYeramareddy
 */
public class BookParser {
    
    private Document doc;    
    private String htmlContent;   
    private Book book;
    
    protected Document getDoc() {
        return doc;
    }
    
    protected String getHtmlContent() {
        return htmlContent;
    }
    
    protected Book getBook() {
        return book;
    }
    
    public BookParser(String filePath) throws IOException {
        URL url = BookParser.class.getClassLoader().getResource(filePath);
        System.out.println(url.getPath());
        htmlContent = IOUtils.toString(url);
        doc = Jsoup.parse(htmlContent);
        book = parseBookValues();
    }
    
    private Book parseBookValues() {
        Book returnVal = new Book();
        returnVal.setAuthor(findAuthor());
        returnVal.setIsbn10(findIsbn10());
        returnVal.setLanguage(findLanguage());
        returnVal.setPages(findPages());
        returnVal.setPrice(findPrice());
        returnVal.setPublisher(findPublisher());
        returnVal.setShippingWeight(findShippingWeight());
        returnVal.setTitle(findTitle());
        return returnVal;
    }
    
    private String findTitle() {
        Elements title = doc.select(PathMapping.TITLE);
        title.select("span").remove();
        return title.html();
    }
    
    private String findAuthor() {
        Elements author = doc.select(PathMapping.AUTHOR);
        return author.first().text();
    }
    
    private String findPublisher() {
        Elements publisher = doc.select(PathMapping.PUBLISHER);
        publisher.select("b").remove();
        return publisher.html().substring(0, publisher.html().indexOf("("));
    }
    
    private String findIsbn10() {
        Elements isbn10 = doc.select(PathMapping.ISBN_10);
        isbn10.select("b").remove();
        return isbn10.html();
    }
    
    private String findLanguage() {
        Elements language = doc.select(PathMapping.LANGUAGE);
        language.select("b").remove();
        return language.html();
    }
    
    private Double findShippingWeight() {
        Elements weight = doc.select(PathMapping.WEIGHT);
        weight.select("b").remove();
        weight.select("a").remove();
        String str = weight.html().replace("(", "").replace(")", "").split(" ")[0];
        try {
            if(StringUtils.isNotBlank(str)) {
                return Double.valueOf(str);
            }
        } catch(Exception ex) {  }
        return null;
    }
    
    private Double findPrice() {
        Elements price = doc.select(PathMapping.PRICE);
        String str = price.html().replace("$", "").replaceAll(",", "");
        try {
            if(StringUtils.isNotBlank(str)) {
                return Double.valueOf(str);
            }
        } catch(Exception ex) { }
        return null;
    }
    
    private Integer findPages() {
        Elements pages = doc.select(PathMapping.PAGES_HARDCOVER);
        pages.select("b").remove();
        Integer ret = null;
        if(StringUtils.isNotBlank(pages.html())) {
            try {
                return Integer.valueOf(pages.html().split(" ")[0].replaceAll(",", ""));
            } catch(Exception ex) {}
        } else {
            pages = doc.select(PathMapping.PAGES_PAPERBACK);
            pages.select("b").remove();
            try {
                return Integer.valueOf(pages.html().split(" ")[0].replaceAll(",", ""));
            } catch(Exception ex) {}
        }
        return ret;
    }
    
    public static void main(String[] args) {
        
        //List<File> list = new ArrayList<>(FileUtils.listFiles(new File(mainFilePath), new String[]{"html"}, false));
        //for (final File file : list) {
        
        
        
        try {
            BookParser parser = new BookParser("com/manisha/allmybooksarepacked/data/book1.html");
            System.out.println("BOOK : "+parser.getBook().toString());
        } catch(Exception ex) {
            ex.printStackTrace();
            System.out.println("ERROR: "+ex.getLocalizedMessage());
        }
    }
    
}
