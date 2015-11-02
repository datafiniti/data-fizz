using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace HtmlParser
{
    class HtmlParserController
    {

        public List<string> GetElementsFromHtml(string path, List<HtmlElement> list )
        {
            var result = new List<string>();
            foreach(var item in list)
            {
                if(item.Type == FindOptions.WithOutId)
                {
                    var value = GetTextFromNode(path, item.Expr);
                    result.Add(value);
                }
                else if(item.Type == FindOptions.WithId)
                {
                    var value = GetTextFromNodeById(path, item.Expr, item.Name);
                    result.Add(value);
                }
            }
            return result;
        }


        public string GetTextFromNode(string htmlfile, string expr)
        {
            var doc = new HtmlDocument();
            doc.Load(htmlfile);
            HtmlNode node = doc.DocumentNode.SelectSingleNode(expr);
            string value = (node == null) ? "" : node.InnerText;
            return value;
        }

        public string GetTextFromNodeById(string htmlfile, string expr, string id)
        {
            var doc = new HtmlDocument();
            doc.Load(htmlfile);
            var node = doc.DocumentNode.SelectSingleNode(expr);
            return GetTextFromNodeByIdOnChilds(id, node.ChildNodes);

        }

        public string GetTextFromNodeByIdOnChilds(string id, HtmlNodeCollection nodes)
        {
           foreach (var nodo in nodes)
            {
                if (nodo.InnerHtml.Contains(id))
                {
                    return nodo.InnerText;
                }
                else
                {
                    var result =  GetTextFromNodeByIdOnChilds(id, nodo.ChildNodes);
                    if(!string.IsNullOrEmpty(result))
                    {
                        return result;
                    }
                }
            }
            return "";
        }
    }
}
