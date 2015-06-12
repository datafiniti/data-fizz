<?php
// William Hudgins
// Datafiniti Coding Challenge
// Book.php
//
// Contains a class to represent a book using key information

require_once('PackableItem.php');

/**
 * This class represents a book
*/
class Book extends PackableItem implements JsonSerializable 
{
	private $author;
	private $isbn10;
	
	/**
	 * Constructor for the Book object
	 *
	 * @param String $title book's title
	 * @param String $author book's author
	 * @param double $price book's sales price
	 * @param double $shipingWeight book's shipping weight
	 * @param string $isbn10 book's ISBN-10 number
	 */
	public function __construct($title, $author, $price, $shippingWeight,
		$isbn10)
	{
		parent::__construct($title, $price, $shippingWeight);
		$this->author = $author;
		$this->isbn10 = $isbn10;
	}

	/**
	 * Constructor that takes the Book class' JSON representation
	 *
	 * $param String $jsonObject object's JSON representation. 
	*/	
	public static function __constructJson($jsonObject)
	{
		$new = new Book($jsonObject['title'],
			$jsonObject['author'], $jsonObject['price'], 
			$jsonObject['shippingWeight'], $jsonObject['isbn10']);
		return $new;
	}
	
	/**
	 *
	 * Copy constructor for Book class
	 *
	 * @param Book $other existing Book object to copy
	 */
	public static function __constructCopy($other)
	{	
		$new = new Book($other->title, $other->author, 
			$other->price, $other->shippingWeight, $other->isbn10);
		return $new;
	}

	/**
	 * Returns the book's author
	 *  
	 * @return String book's author
	 */
	public function getAuthor()
	{
		return $this->author;
	}
	
	/**
	 * Returns the book's shipping weight
	 *  
	 * @return double book's shipping weight
	 */
	public function getShippingWeight()
	{
		return $this->shippingWeight;
	}
	
	/**
	 * Sets the book's author
	 *  
	 * @param String $newAuthor book's new author
	 */
	public function setAuthor($newAuthor)
	{
		$this->author = $newAuthor;
	}	

	/**
	 * Sets the book's ISBN-10
	 *  
	 * @param String $newIsbn10 book's new ISBN-10
	 */
	public function setIsbn10($newIsbn10)
	{
		$this->isbn10 = $newIsbn10;
	}	
	
	/**
	 * Encodes the object in JSON format. Called whenever json_encode() is used
	 * @return String the object's JSON representation
	 *
	 */
	public function jsonSerialize()
	{
		return ['class' => "Book",
				'title' => $this->title,
				'author' => $this->author,
				'price' => $this->price,
				'shippingWeight' => $this->shippingWeight,
				'isbn10' => $this->isbn10];
	}
}
