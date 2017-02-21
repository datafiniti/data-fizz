<?php

require_once('ZipArchiveIterator.php');

class RecordSet implements IteratorAggregate {

	private $resourceType_ = false;
	private $itr_ = null;

	public function __construct($resource) {

		$this->resourceType_ = gettype($resource);
		switch($this->resourceType_) {
			case 'string':
				$this->itr_ = new ZipArchiveIterator($resource);
			break;
			case 'array':
				$this->itr_ = new ArrayIterator($resource);
			break;
			default:
			  throw new Exception('RecordSet - Resource type not supported: ' . $this->resourceType);
		}
	}

	public function getIterator() {
		return $this->itr_;
	}

}

