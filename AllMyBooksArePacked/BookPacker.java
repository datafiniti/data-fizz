import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.*;
import org.json.*;
import org.apache.commons.io.*;

public class BookPacker{
  static Book[] book_array = new Book[20];
  static JSONObject box_list = new JSONObject();
  public static void array_constructor(String path) throws IOException{
    String url = path;
    
    for (int i = 1; i <= 20; i++){
      url = url + i + ".html";
      try{
        Document html_file = Jsoup.parse(new File(url), "UTF-8");
        Elements title_block = html_file.getElementsByClass("parseasinTitle");
        String delim = "[\\>\\<]";
        String[] title_tokens = title_block.html().split(delim);
        String title = title_tokens[2];
        Element body = html_file.body();
        Elements author_block = body.getElementsByClass("buying").select("a[href]");
        delim = "ordering";
        String[] author_tokens = author_block.html().split(delim);
        delim = "Details";
        author_tokens = author_tokens[author_tokens.length - 1].split(delim);
        String author = author_tokens[0].trim().replaceAll("\\n", " and ");
        Elements price_block = body.getElementsByClass("bb_price");
        delim = "[$]";
        String[] price_tokens = price_block.html().split(delim);
        String price = price_tokens[price_tokens.length - 1];
        Elements isbn_weight_block = body.getElementById("productDetailsTable").getElementsByClass("content");
        delim = "ISBN-10:";
        String[] isbn_token = isbn_weight_block.html().split(delim);
        delim = "[\\>\\<]";
        isbn_token = isbn_token[1].split(delim);
        String isbn = isbn_token[2].trim();
        delim = "Shipping Weight:";
        String[] weight_token = isbn_weight_block.html().split(delim);
        delim = "[\\>\\<(]";
        weight_token = weight_token[1].split(delim);
        String weight = weight_token[2].trim();
        delim = "[ ]";
        weight_token = weight.split(delim);
        weight = weight_token[0];
        book_array[i-1] = new Book(title, author, price, weight, isbn);
      }
      catch (IOException e){
        e.printStackTrace();
      }
      url = path; //resets url back to folder path
    } 
  }
  
  public static void json_creator() throws JSONException{
    JSONObject box = new JSONObject();
    JSONArray box_array = new JSONArray();
    int first_book = 0;
    int id = 1;
    double total_weight = 0;
    for (int i = 0; i < 20; i++){
      if (total_weight + Double.parseDouble(book_array[i].weight) < 10){
        total_weight += Double.parseDouble(book_array[i].weight);
      }
      else{
        box.put("totalWeight", total_weight);
        box.put("id", id);
        JSONArray json_book_array = new JSONArray();
        for (int j = first_book; j < i; j++){
          JSONObject array_element = new JSONObject();
          array_element.put("Title", book_array[j].title);
          array_element.put("Author", book_array[j].author);
          array_element.put("Price", "$" + book_array[j].price);
          array_element.put("ISBN-10", book_array[j].isbn);
          array_element.put("Weight", book_array[j].weight + " lbs");
          json_book_array.put(array_element);
        }
        box.put("content", json_book_array);
        box_array.put(box);
        box = new JSONObject();
        id++;
        total_weight = Double.parseDouble(book_array[i].weight);
        first_book = i;
      }
    }
    box_list.put("boxes", box_array);
  }
  
  public static void main(String[] args){
    String path = "C:/Users/Roger/Documents/Datafiniti/DataFizz-master/AllMyBooksArePacked/data/book";
    try{
      array_constructor(path);
      json_creator();
      System.out.println(box_list);
    }
    catch(IOException e){}
    catch(JSONException e){}
  }
}

