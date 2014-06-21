<?php
require_once('../lib/php-activerecord/ActiveRecord.php');

ActiveRecord\Config::initialize(function($cfg) {
	$cfg->set_model_directory('models');
	$cfg->set_connections(array(
		'development' => 'mysql://datafiniti:datafiniti@localhost/df_products_dev'),
	  'production' => 'mysql://datafiniti:datafiniti@localhost/df_products')
	);
});

class HereInMyCar {
  

}
