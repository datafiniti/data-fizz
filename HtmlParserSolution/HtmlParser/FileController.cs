using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Script.Serialization;
using BookInformationSolution;


namespace HtmlParser
{
    class FileController
    {
        public List<string> GetHtmlLFilesFromPath(string path)
        {
            if(!string.IsNullOrEmpty(path))
            {
                var files = Directory.GetFiles(path, "*.html");
                if (files.Length > 0)
                {
                    return files.ToList();
                }
            }
            
           return new List<string>();
        }

        public void GenerateJsonTxt(List<BookInformation> listBookInformation)
        {
            var listofBox = CreatingListOfBox(listBookInformation);
            string json = new JavaScriptSerializer().Serialize(listofBox);
            File.WriteAllText(@"../../JSON.txt", json);
        }


        public List<Box> CreatingListOfBox(List<BookInformation> listBookInformation)
        {
            int counter = 0;
            var listBoxOfBooks = new List<Box>();
            foreach(var item in listBookInformation)
            {
                if(listBoxOfBooks.Count == 0)
                {
                    counter++;
                    Box currentBox = new Box();
                    currentBox.id = counter;
                    currentBox.totalWeight = totalWeightBox(item.Shipping_weight, 0);
                    currentBox.contents = new List<BookInformation>();
                    currentBox.contents.Add(item);
                    listBoxOfBooks.Add(currentBox);
                }
                else
                {
                    var totalweight = listBoxOfBooks.Last().totalWeight;
                    var totalWeightOfTheBox = totalWeightBox(item.Shipping_weight, totalweight);
                    if (totalWeightOfTheBox < 10)
                    {
                        listBoxOfBooks.Last().contents.Add(item);
                        listBoxOfBooks.Last().totalWeight = totalWeightOfTheBox;
                    }
                    else
                    {
                         counter++;
                         Box currentBox = new Box();
                         currentBox.id = counter;
                         currentBox.totalWeight = totalWeightBox(item.Shipping_weight, 0);
                         currentBox.contents = new List<BookInformation>();
                         currentBox.contents.Add(item);
                        listBoxOfBooks.Add(currentBox);
                    }
                }
            }
            return listBoxOfBooks;


        }

        public float totalWeightBox(string weight, float currentWeight)
        {
            var resultString = Regex.Match(weight, @"[0-9]+\.[0-9]+").Value;
            var weightofBook = float.Parse(resultString, CultureInfo.InvariantCulture.NumberFormat);
            currentWeight += weightofBook;
            return currentWeight;
        }

    }
}
