<?php
// William Hudgins
// Datafiniti Coding Challenge
// Extractor.php
//
// Contains a class providing an extractor tool used to scrape and extract data from Amazon
//	book pages. Requires the Book class.

require_once('Book.php');

/**
 * This class provides an extractor to scrape and extract data from Amazon book pages.
 * Requires Book class found in Book.php
*/
class Extractor {
	private $dir; // Directory containing book pages
	private $handle; // Directory handle

	/**
	 * Constructor for Exractor class
     *
	 * @param String $dir the directory containing the files to extract data from
    */
	public function __construct($dir) {
		// Get directory listing
		$this->dir = $dir;
		$this->handle = opendir($dir);
		
		// If the directory cannot be opened
		if (!$this->handle) 
			die("Error: Cannot open directory ".$dir." .");
	}

	/**
     * Extracts book information and returns an array of books
     *
     * @return Book[] An array containing information about each book
    */
	public function extractBookInfo() {
		$book = Array(); // Array to hold all books
		
		// Setup appropriate regular expressions for each desired value
		
		// Title regex, without escape characters or delimiters: \"btAsinTitle\".*\<span
		$titleRegex = "/\\\"btAsinTitle\\\".*\\<span/";

		// Author regex, wihout escape characters or delimiters: (\"\>.*\(Author\).*\<a|\"\>.*\(Author)
		// Branching is necessary to fit cases where there are multiple authors
		$authorRegex = "/(\\\"\\>.*\\(Author\\).*\\<a|\\\"\\>.*\\(Author)/";

		// Editor regex, without escape characters or delimiters: \"\>.*\(Editor\)
		$editorRegex = "/\\\"\\>.*\\(Editor\\)/";
		
		// Price regex, without escpae characters or delimiters: bb_price\"\>\s*.*\d
		// \s is there to deal with cases where tabs or newlines breakup the page
		$priceRegex = "/bb_price\\\"\\>\\s*.*\\d/";

		// Regex for weight, without escape characters or delimiters: \/b\>.* pounds
		$weightRegex = "/\\/b\\>.* pounds/";

		// Regex for ISBN-10, without escape characters or delimiters: N-10.*\/b\>.*(\d|X)
		// The first branch is to deal with ISBN-10's ending in a digit, the second branch is for
		//	those ending wih an X
		$isbn10Regex = "/N-10.*\\/b\\>.*(\\d|X)/";

		// While there are files to read, read and ioperate on those files
		while (false !== ($currentFile = readdir($this->handle))) {
			if ($currentFile != "." && $currentFile != "..") { // Skip the . and .. files
				$file = file_get_contents($this->dir."/".$currentFile);
				$matches = array();
				
				// Capture string text using regular expressions
				preg_match($weightRegex, $file, $shippingWeight);
				preg_match($isbn10Regex, $file, $isbn10);
				preg_match_all($priceRegex, $file, $price);
				preg_match_all($authorRegex, $file, $author);
				preg_match($titleRegex, $file, $title);

				// Extract appropriate values from captured strings
				$title = $this->extractTitle($title[0]);
				$author = $this->extractAuthor($author[0]);
				
				// If there are no authors, only an editor then store editor as author
				if ($author === 0) {
					preg_match("/\\\"\\>.*\\(Editor\\)/", $file, $author);
					$author = explode(">", $author[0]);
					$author = substr($author[1], 0, -3);
				}

				$price = $this->extractPrice($price[0]);
				$shippingWeight = $this->extractShippingWeight($shippingWeight[0]);
				$isbn10 = $this->extractIsbn10($isbn10[0]);

				$book[] = new Book($title, $author, $price, $shippingWeight, $isbn10);
			}
		}
		
		return $book;
	}

	/**
	 * Extracts the title of a book from a string of text obtained via a regular expression.
     *
	 * @param String $capturedString String captured using a regular expression
	 * @return String The title of the book
	*/
	public function extractTitle($capturedString) {
		$title = explode(">", $capturedString);
		$title = $title[1];
		$title = substr($title, 0, -6);

		// In some cases, there are still HTML tags present, so one more filtering might be in order
		if (strpos($title, "<") !== FALSE) {
			$title = explode("<", $title);
			$title = $title[0];
		}
		
		return $title;
	}

	/**
	 * Extracts the authors of a book from strings of text obtained via a regular expression.
	 * In cases where there is no author, only an editor, returns an error code for further processing.
     *
	 * @param String[] $capturedString Array of all matches to the author capturing regular expression
	 * @return mixed Returns 0 if there are no authors, returns a single string listing all authors otherwise
	*/ 
	public function extractAuthor($capturedString) {
		// Extract authors from captured strings
		foreach ($capturedString as &$currentString) {
			$currentString = explode(">", $currentString);
			$currentString = substr($currentString[1], 0, -3); // Remove railing HTML code
		}
		
		// Deal with cases of one, multiple, and no authors
		$numAuthors = count($capturedString);
		if ($numAuthors == 1)
			$author = $capturedString[0];
		else if ($numAuthors > 1) {
			$author = $capturedString[0];
			for ($i = 1; $i < count($capturedString) - 1; $i++)
			$author .= ", ".$capturedString[$i];
			$author .= ", & ".$capturedString[$i];
		}
		else if ($numAuthors == 0)
			$author = 0;

		return $author;
	}

	/**
	 * Extracts the price of a book from a string of text obtained via a regular expression.
	 * In cases where there are multiple prices, such as rent price vs buy price, it selects
	 *	the highest price, because that price is the buy price. In all cases, selects
	 * 	the price next to the "Buy Now" button.
     *
	 * @param String[] $capturedString Array of all matches to the price capturing regular expression
	 * @return Double The appropriate price for the book
	*/ 
	public function extractPrice($capturedString) {
		// Extract prices from the captured strings
		foreach ($capturedString as &$currentString) {
			$currentString = explode("$", $currentString)[1];
		}

		return max($capturedString);
	}

	/**
	 * Extracts the shipping weight of a book from a string of text obtained via a regular expression.
     *
	 * @param String $capturedString String captured using a regular expression
	 * @return Double The shipping weight of the book
	*/
	public function extractShippingWeight($capturedString) {
					$shippingWeight = explode(">", $capturedString);
					$shippingWeight = $shippingWeight[1];
					$shippingWeight = explode(" ", $shippingWeight);
					$shippingWeight = $shippingWeight[1];
					return $shippingWeight;
	}

	/** 
	 * Extracts the ISBN-10 number of a book from a string of text obtained via a regular expression.
     *
	 * @param String $capturedString String captured using a regular expression
	 * @return String The book's ISBN-10 number
	*/
	public function extractIsbn10($capturedString) {
					$isbn10 = explode(":", $capturedString);
					$isbn10 = $isbn10[1];
					$isbn10 = explode(" ", $isbn10);
					$isbn10 = $isbn10[1];
					return $isbn10;
	}
}
