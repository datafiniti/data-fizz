# Installation

`pip install -r requirements.txt`

# Design Choices
1. Python was used as the language
2. BeautifulSoup is a library available for python which parses HTML and builds a DOM tree. It can even handle partially broken HTML which a lot of pages may have on the web. This is the only thirdparty library used.
3. To produce JSON, standard JSON library that comes with python is used.
4. In python, modules are used as a part of Object Oriented Programming when storing a collection of methods; in this case, the extractors are collection of methods rather than an object with data stored in it. Therefore a module was used instead of a class in `extractors.py`. Using classes for this would be an overkill. However, when the scope of the program increases, it may be rethought in terms of classes.
# Extensions

### Domains beyond Amazon.com
1. Since the code uses the class/id of the location of the desired field in the extractor functions, one way to generalize it would be to maintain a database with the following fields: `Domain`, `tag`, `params`, where `Domain` stores the domain name, for instance Amazon.com, `tag` stores the tag, for instance span, div, etc. and `params` stores the dictionary argument to python, e.g. `{'class':'price'}` or `{'id':'boldPrice'}`, etc.
2. It is possible that a single domain has multiple types of pages - when a promo is run, the price could follow a different style or strike through prices etc. For this, we can add extra fields like `scenario`, `id` for deciding how to identify what is in a page; Scenario for instance could be an identifying tag/class for the page like `{'class':'promoPrice'}` etc; and id could be a number indiciating multiple such tags;
3. Another possibility is that someties the price is present not in html tags, but in JSON embedded, which the JavaScript takes and renders. If you are not using `phantomjs` or some such library to evaluate JS, we need to write special extractors to obtain the data from JSON, which is beyond the scope of the current application.



### Products beyond just simply books.
1. The fields for other products may change (for instance, non-books do not have an Author field). This may warrant a modification in the database design to have `PageId, Domain, Field, Value` kind of table structure, where we can extract whatever fields need to be extracted and store them.
2. The table that stored the identifiers for extracting information (which could be XPATH or the params like discussed above) needs to change as well to `Domain, Field, Identifiers` where identifers were `tag, params` in the section above. The `Field` values in the case of books are Author, Price, etc. However, for other products they'd be different.

### Parse and ship 2,000,000 books (in a reasonably time frame; e.g., polynomial time) instead of merely 20.
1. The current program processes page by page, but still keeps the extracted fields in memory. That'd be unacceptable if there are too many books. So, the first change would be to write every field extracted to the output as and when available.
2. The extraction process can be parallelized and distributed, where a cluster of computers can read from a queue and process the pages one by one. The size of the cluster can be chosen depending on the number of pages to be processed vs. the throughput of each machine.
3. The extraction process from a single page is polynomial (since reading/parsing HTML, search etc. are all polynomial). 
4. To ship the books, the most complex step is the sorting part. This can be done distributed as well, using map-reduce.
