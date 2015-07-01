<?php
// William Hudgins
// Datafiniti Coding Challenge
// Packer.php
//
// Contains a class providing an packing tool used to pack N packable items into
//	M boxes of a specified capacity. Requires both the Box and PackableItem classes.

require_once('PackableItem.php');
require_once('Box.php');

/**
 * This class provides a packer to pack N packable items into M boxes of a specified
 * capacity. Requires Box and PackableItem classes, found in Box.php and PackableItem.php
 * respectively.
*/
class Packer {
	private $capacity; // Capacity of each box in pounds
	private $box; // Collection of boxes

	/**
	 * Creates a packer used to pack boxes of the specified capacity
	 *
	 * @param Double $capacity the capacity, in pounds, of each box to be used
	 */
	public function __construct($capacity) {
		$this->capacity = $capacity;
		$this->box = Array();
		$this->box[] = new Box("1", $capacity);
	}

	/**
	 * Packs N items into M boxes of specified capacity
	 *
	 * @param PackableItem[] $item the items to be packaged
	 */
	public function packItems($item) {
		foreach ($item as $currentItem) {
			$packed = false;

			// Check if item will fit in any open boxes
			for ($i = 0; $i < count($this->box) && !$packed; $i++) {
				if ($this->box[$i]->getFreeCapacity() >= $currentItem->getShippingWeight()) {
					$this->box[$i]->packItem($currentItem);
					$packed = true;
				}
			}

			// If a new box needs to be opened	
			if (!$packed) {
				$this->box[$i] = new Box(($i + 1), 10);
				$this->box[$i]->packItem($currentItem);
			}
		}
	}

	/**
	 * Returns the packed boxes
	 *
	 * @return Box[] an array of packed boxes
	 */
	public function getBoxes() {
		return $this->box;
	}
}
