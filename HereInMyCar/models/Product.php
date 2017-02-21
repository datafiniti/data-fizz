<?php

class Product extends ActiveRecord\Model {
	static $attr_accessible = array('id', 'key', 'source', 'date_updated', 'date_inserted');

	public function set_key($key) {
		$this->assign_attribute('key', trim($key));
	}

	public function set_source($source) {
		$this->assign_attribute('source', trim($source));
	}

	public function set_date_updated($date_updated) {
		if(is_numeric($date_updated)) {
			// Convert timestamp to datetimes: 2014-06-25T16:18:09Z
			$date_updated = date(DATE_RFC3339, $date_updated);
		}
		$this->assign_attribute('date_updated', trim($date_updated));
	}

}
