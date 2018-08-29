# DataFizz
**Matthew Bruns** 
**8/29/2018**

## How to Run
After cloning the project on a computer with NodeJS installed and a working Internet connection, move to its directory. On the command line, one can execute
*node ./Data_Fizz_Crawler_Matthew_Bruns.js https://www.amazon.com books*
The third argument is required to be books for the crawler to function properly, as the code was specialized for this particular instance. As described in EXTENSIONS.txt, there are many angles upon which to expand, such as preparing tables for different websites with appropriate regular expressions packaged for ease of use.

## General Principle
The main technique used to ensure correct execution order in the context of the crawler itself is recursive calling. By making sure that functions are recursive and feed directly into each other, we can be certain that the websites will load in the order requested while being able to pass data from XHTTP request to XHTTP request. This ensures that when a webpage is considered there is no premature handling of values.
Multiple files act as an attempt to cleave closely to single responsibility principle. *pre_struct* acts as the source of the Product class and its internal functions, *parse_functions* handles parsing for the crawler, *format_results* handles formatting, and the main file handles the execution of web calls and calls all of the other areas as needed to accomplish its purpose. It could be argued that scraper and site_to_JSON deserve individual files, but this was ultimately passed over due to their neccesary entanglement.

## Complications and Issues
The majority of complications stem from one of two sources: robot detection providing an unreadable HTML document for the crawler to run into, and HTTP requests dropping. The former is most easly avoided by providing multiple websites within the Amazon domain, which are stripped down in future calls. The second is mostly unavoidable but is also exasperated by the regular calling. 
The recursive design naturally comes with the issue that any break in the chain causes a collapse in continuity. With regards to this flaw,I have placed safety nets, including the 'Formatting what products we could get...' else statement for dropped HTTP requests. Another issue would be sustaining the recursion over large networks, but for the scope of this project it is not important.

## Testing Results
Several sets of results have been brought together through testing. Testing was done at every step of the process in order to ensure the crawler closely matched expectations. *results_1.txt* displays one of the largest and most obtrusive errors in the process, the Amazon bot detection forming an HTML wall that brooks no further penetration. *results_2.txt* shows a prior-to-final set of results where some regular expressions are not applied to parse the file properly and were later fixed. *results_3.txt* displays one outcome of the partmain test. Even with the relatively low URL-to-Product conversion rate, it serves as a good example of the crawler's capacity. *results_4.txt* explands on this further by displaying many upon many instances of captured data acquired by the crawler. *results_5.txt* is perhaps the most complete execution gathered so far and collects a satisfying amount of data on a number of objects found through crawling.
