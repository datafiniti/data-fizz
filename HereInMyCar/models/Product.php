<?php
require_once('../lib/datafiniti/DatafinitiClient.php');

class Product extends ActiveRecord\Model {
	protected $dataClient_ = null;
	static $attr_accessible = array('id', 'key', 'source', 'dateUpdated', 'dateInserted');
	
	public function __construct() {
    $this->dataClient_ = new DatafinitiClient();

	}
}
