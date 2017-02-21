<?php
// William Hudgins
// Datafiniti Coding Challenge
// Box.php
//
// Contains a class to represent a box. Requires PackableItem class. 

require_once('PackableItem.php');

/**
 * This class represents a box. Requires PackableItem class found in PackableItem.php
*/
class Box implements JsonSerializable {
	private $id;
	private $capacity;
	private $content;
	private $totalWeight;
	
	/**
	 * Constructor for the Boox object
	 *
	 * @param String $id unique ID number for box
	 * @param double $capacity capacity box can ship in pounds
	 */
	public function __construct($id, $capacity) {
		$this->id = $id;
		$this->capacity = $capacity;
		$this->content = Array();
		$this->totalWeight = 0;
	}

	// Needs JSON constructor here
	
	/**
	 * Copy constructor for Box class
	 *
	 * @param Box $other existing Box object to copy
	 */
	public static function __constructCopy($other) {	
		$new = new Box($other->id, $other->capacity, 
			$other->content, $other->totalWeight);
		return $new;
	}

	/**
	 * Returns the box's ID
	 *  
	 * @return String box's ID
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * Returns the box's shipping capacity in pounds
	 *  
	 * @return Double box's shipping capacity in pounds
	 */
	public function getCapacity() {
		return $this->capacity;
	}

	/**
	 * Returns the box's remaining shipping capacity in pounds
	 *  
	 * @return Double box's remaining shipping capacity in pounds
	 */
	public function getFreeCapacity() {
		return $this->capacity - $this->totalWeight;
	}


	/**
	 * Returns the box's contents
	 *  
	 * @return Array[] Returns array of box's contents
	 */
	public function getContents() {
		return $this->content;
	}

	/**
	 * Returns the box's total shipping weight
	 *  
	 * @return Double box's total shipping weight
	 */
	public function getWeight() {
		return $this->totalWeight;
	}	

	/**
	 * Sets the box's ID
	 *  
	 * @param String $newID box's new ID
	 */
	public function setId($newId) {
		$this->id = $newId;
	}	

	/**
	 * Adds an item to the box's contents
	 *	
     * @param PackableItem $item the item to be packed
	 * @return boolean returns true if packed successfully, false otherwise
     */
    public function packItem($item) {
		$success = false;
		if ($this->totalWeight + $item->getShippingWeight() <= $this->capacity) {
			$this->content[] = $item;
			$this->totalWeight += $item->getShippingWeight();
			$success = true;
		}

		return $success;
	}

	/**
     * Removes an item from the box's contents
     *
     * @param String String $title title of item to be removed
	 * @return boolean whether the removal operation was successful. Will return
	 *		false if the item was not in this box
	 */
	public function removeItem($title) {
		// This function still needs to be implemented
	}

	/**
	 * Encodes the object in JSON format. Called whenever json_encode() is used
	 *
	 * @return String the object's JSON representation
	 */
	public function jsonSerialize() {
		return ['class' => "Box",
				'id' => $this->id,
				'capacity' => $this->capacity,
				'totalWeight' => $this->totalWeight,
				'content' => $this->content];
	}
}
