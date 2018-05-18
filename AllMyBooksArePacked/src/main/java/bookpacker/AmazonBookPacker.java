package bookpacker;

import java.io.File;
import java.io.IOException;
import java.util.regex.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

public class AmazonBookPacker extends BookPacker {

	static final String ISBN10 = "ISBN-10:";
	static final String SHIPPING_WEIGHT = "Shipping Weight:";

	static Pattern key = Pattern.compile("\\A.*:");
	static Pattern leadingNumber = Pattern.compile("\\A\\w*\\d+(\\.\\d+)?");

	public Book getBookFromPage(File webPage) throws IOException {
		// Do jsoup parsing and create Book object to return
		Document doc = Jsoup.parse(webPage, null);
		Book bk = new Book();

		/* The title and author are found towards the top of the Amazon
		product page. The title string is in a span whose id is 'btAsinTitle'.
		The author can be found in the text of a link that is a sibling of the
		h1 element that contains the title span. */
		Element titleElt = doc.getElementById("btAsinTitle");
		bk.title = titleElt.text();
		bk.author = titleElt.parent().nextElementSibling().child(0).text();

		// Remember to strip off the leading currency symbol and remove all commas.
		bk.price = Double.valueOf(getPriceString(doc).substring(1).replace(",", ""));

		/* The other pieces of information are in a product detail table
		located further down the page. The table actually contains only a 
		single cell that has an unordered list of data. */
		Element detailList = doc.selectFirst("#productDetailsTable ul");

		// Each list item's text looks like "key: value"
		for (Element listItem : detailList.children().select("li")) {
			Matcher m = key.matcher(listItem.text());
			if (m.find()) {
				switch (m.group()) {
					case ISBN10:
						bk.isbn10 = listItem.text().substring(ISBN10.length() + 1);
						break;
					case SHIPPING_WEIGHT:
						String valStr = listItem.text().substring(SHIPPING_WEIGHT.length() + 1);
						Matcher m2 = leadingNumber.matcher(valStr);
						if (m2.find()) {
							bk.shippingWeight = Double.valueOf(m2.group());
						} else {
							bk.shippingWeight = Double.NaN;
						}
						
				}
			}
		}

		return bk;
	}

	public String getPriceString(Document doc) {
		Element priceElt = doc.getElementById("actualPriceValue");
		if (priceElt != null) {
			return priceElt.text();
		} // otherwise, the price string is somewhere else
		Element priceGrid = doc.getElementById("rentalPriceBlockGrid");
		return priceGrid.selectFirst(".rentPrice").text();
	}

}
