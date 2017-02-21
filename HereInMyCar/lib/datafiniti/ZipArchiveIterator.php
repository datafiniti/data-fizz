<?php

class ZipArchiveIterator implements Iterator {

	private $data_ = array();
	private $dataIdx_ = 0;
	private $recordCnt_ = 0;

	private $archiveHandle_ = null;
	private $zipEntryHandleArr_ = array();
	private $currEntryIdx_ = 0;
	private $numEntryHandles_ = 0;
	private $format_ = 'json';

	public function __construct($archiveFilename, $format = 'json') {

		if($format != 'json') {
			throw new Exception('ZipArchiveIterator does not support formats other than JSON.');
		}

    $this->format_ = $format;
		$this->archiveHandle_ = zip_open($archiveFilename);

		try {
			// Get all the handlers for the archive and put them into an array
			while($zipEntryHandle = zip_read($this->archiveHandle_)) {
				$this->zipEntryHandleArr_[] = $zipEntryHandle;
				$this->numEntryHandles_++;
			}

			//$this->loadZipEntryIntoData();
		} catch (Exception $e) {
			die("ZipArchiveIterator error: " . $e->getMessage() . "\n");
		}
	}

	private function loadZipEntryIntoData($idx = 0) {
		$fileData = null;

		try {
			if(empty($this->zipEntryHandleArr_)) {
				throw new Exception('ZipArchiveIterator error: no entries in ZIP archive to read.');
			}

			$currHandle_ = $this->zipEntryHandleArr_[$idx];
			$this->currEntryIdx_ = $idx;
			$this->dataIdx_ = 0;

			if(zip_entry_open($this->archiveHandle_, $currHandle_)) {
				while($dataChunk = zip_entry_read($currHandle_, 8192)) {
					$fileData .= $dataChunk;
				}
				
				$tmp = json_decode($fileData, true); // Decode JSON into associative array
				$jsonError = json_last_error();
				
				if($jsonError !== 0) {
					throw new Exception("ZipArchiveIterator - JSON decode error $jsonError.");
				}

				$this->data_ = $tmp['records'];
				$this->recordCnt_ = count($this->data_);
				zip_entry_close($currHandle_);
			}
		}
		catch (Exception $e) {
			throw $e; // punt
		}
	}

	public function rewind() {
		$this->loadZipEntryIntoData(0);
	}

	public function valid() {
		// If we've reached the end of a current archive entry load the next, if available;
		$valid = isset($this->data_[$this->dataIdx_]);
		if(!$valid && ($this->currEntryIdx_ < $this->numEntryHandles_ - 1)) {

			$this->currEntryIdx_ = $this->currEntryIdx_ + 1;
			$this->loadZipEntryIntoData($this->currEntryIdx_);
			$valid = isset($this->data_[$this->dataIdx_]);
		}
		return $valid;
	}

	public function current() {
		return $this->data_[$this->dataIdx_];
	}

	public function next() {
		$this->dataIdx_++;
	}

	public function key() {
		return $this->dataIdx_;
	}

	public function __destruct() {
		if(!is_null($this->archiveHandle_)) {
			zip_close($this->archiveHandle_);
		}
		$this->zipEntryHandleArr_ = null;
		$this->data_ = null;
	}

}
