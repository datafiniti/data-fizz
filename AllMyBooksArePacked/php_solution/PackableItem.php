<?php
// William Hudgins
// Datafiniti Coding Challenge
// PackableItem.php
//
// Contains a class to represent a packable item

/**
 * This class represents a packable item
*/
class PackableItem implements JsonSerializable 
{
	protected $title;
	protected $price;
	protected $shippingWeight;
	
	/**
	 * Constructor for the PackableItem object
	 *
	 * @param String $title book's title
	 * @param double $price book's sales price
	 * @param double $shipingWeight book's shipping weight
	 */
	public function __construct($title, $price, $shippingWeight)
	{
		$this->title = $title;
		$this->price = $price;
		$this->shippingWeight = $shippingWeight;
	}

	/**
	 * Constructor that takes the PackableItem class' JSON representation
	 *
	 * @param String $jsonObject object's JSON representation. 
	*/	
	public static function __constructJson($jsonObject)
	{
		$new = new PackableItem($jsonObject['title'], $jsonObject['price'], 
			$jsonObject['shippingWeight']);
		return $new;
	}
	
	/**
	 *
	 * Copy constructor for PackableItem class
	 *
	 * @param PackableItem $other existing PackableItem object to copy
	 */
	public static function __constructCopy($other)
	{	
		$new = new PackableItem($other->title, $other->price, 
			$other->shippingWeight);
		return $new;
	}

	/**
	 * Returns the item's title
	 *  
	 * @return String item's title
	 */
	public function getTitle()
	{
		return $this->title;
	}

	/**
	 * Returns the item's price
	 *  
	 * @return double item's price
	 */
	public function getPrice()
	{
		return $this->price;
	}	
	
	/**
	 * Returns the item's shipping weight
	 *  
	 * @return double item's shipping weight
	 */
	public function getShippingWeight()
	{
		return $this->shippingWeight;
	}
	
	/**
	 * Sets the item's title
	 *  
	 * @param String $newTitle item's new title
	 */
	public function setTitle($newTitle)
	{
		$this->title = $newTitle;
	}	

	/**
	 * Sets the item's price
	 *  
	 * @param Double $newPrice item's new price
	 */
	public function setPrice($newPrice)
	{
		$this->price = $newPrice;
	}	
	
	/**
	 * Sets the item's shipping weight
	 *  
	 * @param Double $newShippingWeight item's new shipping weight
	 */
	public function setShippingWeight($newShippingWeight)
	{
		$this->shippingWeight = $newShippingWeight;
	}	
	
	/**
	 * Encodes the object in JSON format. Called whenever json_encode() is used
	 *
	 * @return String the object's JSON representation
	 */
	public function jsonSerialize()
	{
		return ['class' => "PackableItem",
				'title' => $this->title,
				'price' => $this->price,
				'shippingWeight' => $this->shippingWeight];
	}
}
