using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HtmlParser
{
    class ListHtmlElements
    {
        public List<HtmlElement> GetElements()
        {
            var list = new List<HtmlElement>();
            list.Add(new HtmlElement("Title", "//*[@id=\"btAsinTitle\"]", FindOptions.WithOutId));
            list.Add(new HtmlElement("Author", "//div[@class='buying']//span//a[@href]", FindOptions.WithOutId));
            list.Add(new HtmlElement("Price", "//*[@id=\"actualPriceValue\"]//b", FindOptions.WithOutId));
            list.Add(new HtmlElement("ISBN-10", "//table[@id=\"productDetailsTable\"]//tr//div//ul", FindOptions.WithId));
            list.Add(new HtmlElement("Shipping Weight", "//table[@id=\"productDetailsTable\"]//tr//div//ul", FindOptions.WithId));
            return list;
        }
    }
}
