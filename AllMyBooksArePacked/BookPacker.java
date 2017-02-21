import java.io.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.json.*;
import org.apache.commons.io.*;

public class BookPacker{
 
  /**
   * Creates bookArray which contains book elements, each one corresponding to a HTML file
   */
  public static Book[] buildBookArray(String path) throws IOException{
    Book[] bookArray = new Book[20];
    for (int i = 1; i <= 20; i++){
      try{
        Element body = Jsoup.parse(new File(path + i + ".html"), "UTF-8").body();
        bookArray[i-1] = new Book(getTitle(body), getAuthor(body), getPrice(body), getWeight(body), getIsbn(body));
      }
      catch (IOException e){
        e.printStackTrace();
      }
    } 
    return bookArray;
  }
  
  /**
   * The following five helper methods obtain the appropriate field from the body
   */
  public static String getTitle(Element body){ 
    Elements titleBlock = body.getElementsByClass("parseasinTitle");
    String delim = "[\\>\\<]";
    String[] titleTokens = titleBlock.html().split(delim);
    return titleTokens[2];
  }
  
  public static String getAuthor(Element body){ 
    Elements authorBlock = body.getElementsByClass("buying").select("a[href]");
    String delim = "ordering";
    String[] authorTokens = authorBlock.html().split(delim);
    delim = "Details";
    authorTokens = authorTokens[authorTokens.length - 1].split(delim);
    return authorTokens[0].trim().replaceAll("\\n", " and "); //if more than one author, insert "and"
  }
  
  public static String getPrice(Element body){ 
    Elements priceBlock = body.getElementsByClass("bb_price");
    String delim = "[$]";
    String[] priceTokens = priceBlock.html().split(delim);
    return priceTokens[priceTokens.length - 1];
  }
  
  public static String getIsbn(Element body){ 
    Elements isbnBlock = body.getElementById("productDetailsTable").getElementsByClass("content");
    String delim = "ISBN-10:";
    String[] isbnToken = isbnBlock.html().split(delim);
    delim = "[\\>\\<]";
    isbnToken = isbnToken[1].split(delim);
    return isbnToken[2].trim(); 
  }
  
  public static String getWeight(Element body){ 
    Elements weightBlock = body.getElementById("productDetailsTable").getElementsByClass("content");
    String  delim = "Shipping Weight:";
    String[] weightToken = weightBlock.html().split(delim);
    delim = "[\\>\\<(]";
    weightToken = weightToken[1].split(delim);
    String weight = weightToken[2].trim();
    delim = "[ ]";
    weightToken = weight.split(delim);
    return weightToken[0];
  }
  
  public static JSONObject buildDataExport(Book[] bookArray) throws JSONException{
    JSONObject boxList = new JSONObject();
    JSONObject box = new JSONObject(); //box goes into boxArray
    JSONArray boxArray = new JSONArray(); //boxArray goes into boxList
    int firstBook = 0; //first book of each box
    int id = 1; //box id
    double totalWeight = 0; //total weight of all the books in the box
    for (int i = 0; i < 20; i++){
      if (totalWeight + Double.parseDouble(bookArray[i].weight) < 10){ //add book to box if it'll fit
        totalWeight += Double.parseDouble(bookArray[i].weight); 
      }
      else{ //otherwise close the box, and compile JSON information
        box.put("totalWeight", totalWeight);
        box.put("id", id);
        JSONArray jsonBookArray = new JSONArray(); //jsonBookArray goes into box
        for (int j = firstBook; j < i; j++){ //for every book in the box
          JSONObject arrayElement = new JSONObject(); //arrayElement goes into jsonBookArray
          arrayElement.put("Title", bookArray[j].title);
          arrayElement.put("Author", bookArray[j].author);
          arrayElement.put("Price", "$" + bookArray[j].price);
          arrayElement.put("ISBN-10", bookArray[j].isbn);
          arrayElement.put("Weight", bookArray[j].weight + " lbs");
          jsonBookArray.put(arrayElement);
        }
        box.put("content", jsonBookArray);
        boxArray.put(box);
        box = new JSONObject(); //reset the box
        id++; //new box id
        totalWeight = Double.parseDouble(bookArray[i].weight); //the book that wasn't inserted on this iteration is in the next box
        firstBook = i; //change where the first book in the new box index value is
      }
    }
    //Edge condition: last book doesn't "close" the box from previous for loop, so repeat code in order to satisfy this
    box.put("totalWeight", totalWeight);
    box.put("id", id);
    JSONArray jsonBookArray = new JSONArray();
    for (int i = firstBook; i < 20; i++){
      JSONObject arrayElement = new JSONObject();
      arrayElement.put("Title", bookArray[i].title);
      arrayElement.put("Author", bookArray[i].author);
      arrayElement.put("Price", "$" + bookArray[i].price);
      arrayElement.put("ISBN-10", bookArray[i].isbn);
      arrayElement.put("Weight", bookArray[i].weight + " lbs");
      jsonBookArray.put(arrayElement);
    }
    box.put("content", jsonBookArray);
    boxArray.put(box);
    boxList.put("boxes", boxArray);
    return boxList;
  }
  
  /**
   * Main method uses path in my local memory to access the HTML files
   */
  public static void main(String[] args){
    String path = "C:/Users/Roger/Documents/Datafiniti/DataFizz-master/AllMyBooksArePacked/data/book"; //local path
    try{
      JSONObject boxList = buildDataExport(buildBookArray(path));
      System.out.println(boxList);
    }
    catch(IOException e){}
    catch(JSONException e){}
  }
}