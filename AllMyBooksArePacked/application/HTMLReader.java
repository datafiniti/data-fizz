package application;

import java.io.File;
import java.io.IOException;

import java.net.URL;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class HTMLReader {
    
    public Document getDocument(String filepath){
        //File input = new File("AllMyBooksArePacked\\data\\book#.html");
        File input = new File(filepath);
        //System.out.println("File path: " + input.getAbsolutePath());
        try{
            Document doc = Jsoup.parse(input, "UTF-8", "");
            return doc;
        }//attempt to read file
        catch(IOException ie){
            return null;
        }//if it doesn't succeed, return null
    }//getDocument
    
    public String extractTitle(Document doc){
        Elements titles = doc.select("title");
        return titles.first().text();
    }//extractTitle
}//end of class: HTMLReader
