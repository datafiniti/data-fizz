<?php
require_once('Product.php');

class Vehicle extends Product {
	static $attr_accessible = array('id', 'key', 'source', 'date_updated', 'date_inserted', 'price', 'province', 'city');
  static $table_name = 'products';

  public function set_price($price) {
		$this->assign_attribute('price', trim(preg_replace('/[^0-9.]/', '', $price)));
	}

	public function set_province($province) {
		$this->assign_attribute('province', trim(strtoupper($province)));
	}

	public function set_city($city) {
		$this->assign_attribute('city', trim(ucwords($city)));
	}
	

}
