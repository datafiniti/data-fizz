using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HtmlParser
{
    public enum FindOptions
    {
        
        WithOutId = 0,
        // The flag for Spoiler is 0010.
        WithId = 1
    }
    class HtmlElement
    {
        private string _name;
        private string _expr ;
        private FindOptions _type;

        public HtmlElement(string name, string exp, FindOptions type)
        {
            Name = name;
            Expr = exp;
            Type = type;
        }


        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        public string Expr
        {
            get { return _expr; }
            set { _expr = value; }
        }

        public FindOptions Type
        {
            get { return _type; }
            set { _type = value; }
        }
    }
}
