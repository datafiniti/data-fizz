# Installation

`pip install -r requirements.txt`

# Design Choices

# Extensions

### Domains beyond Amazon.com
1. Since the code uses the class/id of the location of the desired field in the extractor functions, one way to generalize it would be to maintain a database with the following fields: `Domain`, `tag`, `params`, where `Domain` stores the domain name, for instance Amazon.com, `tag` stores the tag, for instance span, div, etc. and `params` stores the dictionary argument to python, e.g. `{'class':'price'}` or `{'id':'boldPrice'}`, etc.
2. It is possible that a single domain has multiple types of pages - when a promo is run, the price could follow a different style or strike through prices etc. For this, we can add extra fields like `scenario`, `id` for deciding how to identify what is in a page; Scenario for instance could be an identifying tag/class for the page like `{'class':'promoPrice'}` etc; and id could be a number indiciating multiple such tags;
3. Another possibility is that someties the price is present not in html tags, but in JSON embedded, which the JavaScript takes and renders. If you are not using `phantomjs` or some such library to evaluate JS, we need to write special extractors to obtain the data from JSON, which is beyond the scope of the current application.



### Products beyond just simply books.
### Parse and ship 2,000,000 books (in a reasonably time frame; e.g., polynomial time) instead of merely 20.
