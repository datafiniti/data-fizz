package application;

import java.io.File;
import java.io.IOException;

import java.util.List;
import java.util.ArrayList;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**A simple HTML reader that can extract text from HTML elements.
 * Elements can be specified by ID, tag, or class.
 * 
 * @author Greg McDonald
 *
 */
public class HTMLReader {
    
    private Document document;
    
    /**Constructs an HTMLReader that reads from the HTML file at the specified
     * filepath.
     * @param filepath the file path to the HTML file to read from.
     */
    public HTMLReader(String filepath){
        document = loadDocument(filepath);
    }//constructor
    
    /**Constructs an HTMLReader that reads from the specified
     * JSoup Document.
     * @param document the JSoup Document to extract text from.
     */
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
    /**Extracts the HTML page title.
     * @return a String containing the HTML page title.
     */
    public String extractPageTitle(){
        Elements titles = document.select("title");
        return titles.first().text();
    }//extractTitle
    
    /**Extracts the text associated with element with the specified ID.
     * @param elementID the HTML ID to extract element text by.
     * @return a String containing the extracted text.
     */
    public String extractElementTextByID(String elementID){
        Element content = document.getElementById(elementID);
        if(content != null){
            return content.text();
        }//if content was found
        else{
            return "";
        }//otherwise return empty string
    }//extractElementText
    
    /**Extracts all the text associated with elements of the specified class.
     * @param className the HTML class to extract element text by.
     * @return a List of Strings containing the extracted text.
     */
    public List<String> extractElementsTextByClass(String className){
        Elements content = document.getElementsByClass(className);
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
    }//extractElementsTextByClass
    
    /**Extracts all the text associated with elements of the specified tag.
     * @param tag the HTML tag to extract element text by.
     * @return a List of Strings containing the extracted text.
     */
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
    /**Returns the JSoup Document that this HTMLReader extracts text from.
     * @return the JSoup Document that this HTMLReader extracts text from.
     */
    public Document getDocument(){
        return document;
    }//getDocument
}//end of class: HTMLReader
