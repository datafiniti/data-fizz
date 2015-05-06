package application;

import java.io.File;
import java.io.IOException;

import java.net.URL;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.util.List;
import java.util.ArrayList;

public class HTMLReader {
    
    private Document document;
    
    public HTMLReader(String filepath){
        document = loadDocument(filepath);
    }//constructor
    
    public HTMLReader(Document document){
        this.document = document;
    }//constructor
    
    private Document loadDocument(String filepath){
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
    
    /* ------- EXTRACTING INFORMATION ------- */
    public String extractPageTitle(){
        Elements titles = document.select("title");
        return titles.first().text();
    }//extractTitle
    
    public String extractElementTextByID(String elementID){
        Element content = document.getElementById(elementID);
        if(content != null){
            return content.text();
        }//if content was found
        else{
            return "";
        }//otherwise return empty string
    }//extractElementText
    
    public String extractElementTextByClass(String className, int elementIndex){
        Elements content = document.getElementsByClass(className);
        if(content != null && content.size() != 0){
            Element element = content.get(elementIndex);
            if(element != null){
                return element.text();
            }//element was found
            else{
                return "";
            }//element not found
        }//if content was found
        else{
            return "";
        }//otherwise return empty string
    }//extractElementTextByClass
    
    public List<String> extractElementsTextByTag(String tag){
        Elements content = document.getElementsByTag(tag);
        if(content != null){
            ArrayList<String> elementTexts = new ArrayList<String>();
            for(int i = 0; i < content.size(); i++){
                elementTexts.add(content.get(i).text());
            }//for all content elements
            return elementTexts;
        }//if content was found
        else{
            return new ArrayList<String>(0);
        }//otherwise return empty string
    }//extractElementTextByTag
    
    /* ------- ACCESSORS ------- */
    public Document getDocument(){
        return document;
    }//getDocument
}//end of class: HTMLReader
