package DataFizz;
import org.jsoup.Jsoup;
import org.jsoup.helper.StringUtil;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.IOException;


public  class ParseBookData {


    private Document doc;
    public ParseBookData()
    {
    }

    public Book getBook(String location) throws IOException {
        File input = new File(location);
        doc = Jsoup.parse(input,"UTF-8","");
        String title = getTitle();
        String author = getAuthor();
        Double price = getPrice();
        Double shippingWeight = getShippingWeight();
        String ISBN = getISBN();
        Book book = new Book(price,title,author,shippingWeight,ISBN);
        return book;
    }

    private String getTitle()
    {
        Elements title = doc.select("#btAsinTitle");
        title.select("span").remove();
        return  title.html().trim();
    }

    private String getAuthor()
    {
        Elements author = doc.select("div.buying span a");
        return author.first().text().trim();
    }
    private Double getPrice()
    {
       Elements price = doc.select("table.product tr#actualPriceRow td#actualPriceContent span#actualPriceValue b.priceLarge");
        String p = price.html().replace("$","").replaceAll(",", "");
        if(!StringUtil.isBlank(p)) {
            return Double.valueOf(p);
        }
        else
            return null;
    }
    private Double getShippingWeight()
    {
       Elements weight = doc.select("table#productDetailsTable tr td.bucket div.content > ul > li:contains(Shipping Weight)");
        weight.select("b").remove();
        weight.select("a").remove();
        String shipweight =  weight.html().replace("(", "").replace(")", "").split(" ")[0];
        if(!StringUtil.isBlank(shipweight)) {
            return Double.valueOf(shipweight);
        }
        else
            return null;

    }
    private String getISBN()
    {
        Elements ISBN = doc.select("table#productDetailsTable tr td.bucket div.content > ul > li:contains(ISBN-10)");
        ISBN.select("b").remove();
        return ISBN.html().trim();
    }
}
