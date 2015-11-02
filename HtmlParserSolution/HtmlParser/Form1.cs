using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;
using BookInformationSolution;
using HtmlAgilityPack;


namespace HtmlParser
{
    public partial class Form1 : Form
    {
        private string _folderPath;
        private FileController _file;
        private HtmlParserController _htmlParser;
        private List<string> _htmlFiles;

        public Form1()
        {
            InitializeComponent();
            _folderPath = "";
            _file = new FileController();
            _htmlParser = new HtmlParserController();
            _htmlFiles = new List<string>();
        }

        private void btnLoadDirectory_Click(object sender, EventArgs e)
        {
            listLog.Items.Clear();
            FolderBrowserDialog fbd = new FolderBrowserDialog();
            DialogResult result = fbd.ShowDialog();
            _folderPath = fbd.SelectedPath;
            if (!string.IsNullOrEmpty(_folderPath))
            {
                lblPathFolder.Text = _folderPath;
                listLog.Items.Add("Folder Was Added");
            }
        }

        private void btnParse_Click(object sender, EventArgs e)
        {
            listLog.Items.Add("Parse started....");
            var elementsList = new ListHtmlElements();
            var elements = elementsList.GetElements();
            var bookList = _htmlFiles.Select(htmlfile => _htmlParser.GetElementsFromHtml(htmlfile, elements))
                                      .Select(result => new BookInformation
                                      {
                                          Title = result[0], 
                                          Author = result[1], 
                                          Price = result[2], 
                                          ISBN10 = result[3], 
                                          Shipping_weight = result[4]
                                      }).ToList();

            listLog.Items.Add("Parse end");

            _file.GenerateJsonTxt(bookList);
            listLog.Items.Add("File Was Generated");
        }

        private void btnLoadFilesFromPath_Click(object sender, EventArgs e)
        {
            _htmlFiles = _file.GetHtmlLFilesFromPath(_folderPath);
            listLog.Items.Add("HTML Files were added..." + " we found " + _htmlFiles.Count.ToString() + " files");
        }

    }
}
