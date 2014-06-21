<?php
define('HOME_PATH', dirname(__FILE__));
require_once(HOME_PATH . '/ConfigVars.php');
require_once(HOME_PATH . '/lib/php-activerecord/ActiveRecord.php');
require_once(HOME_PATH . '/lib/datafiniti/DatafinitiClient.php');

class HereInMyCar {

	private $dataClient_ = null;
	public static $states = array('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');

  public function __construct() {
		ActiveRecord\Config::initialize(function($cfg) {
				$cfg->set_model_directory('models');
				$cfg->set_connections(array(
						'development' => 'mysql://' . DB_USER . ':' . DB_PASSWORD . '@' . DB_HOST . '/' . DB_DB . '_dev',
						'production' => 'mysql://' . DB_USER . ':' . DB_PASSWORD . '@' . DB_HOST . '/' . DB_DB 
					)
				);
		    $cfg->set_default_connection('development');
    });

		$this->dataClient_ = new DatafinitiClient(DATAFINITI_API_KEY);
	}

	public function populateDB() {
     $data = $this->dataClient_->queryProducts("vin:['' TO *] AND dateUpdated:[2014-05-10 TO *]");
		 foreach($data->records as $record) {
			 $productKey = trim($record->key);

			 if(!Vehicle::find_by_key($productKey) 
				 && isset($record->merchant) && isset($record->price)
				 && isset($record->merchant[0]->province) && isset($record->price[0]->amount)) { // No duplicate keys must be inserted, nor records without province or price
				 
				 try {
					 if(in_array($record->merchant[0]->province, self::$states)) { // Only insert vehicles found in US states
					   $newRecord = array('key' => $productKey, 'source' => $record->source, 'date_updated' => $record->dateUpdated, 
								'price' => $record->price[0]->amount, 'city' => $record->merchant[0]->city, 'province' => $record->merchant[0]->province);
					   $vehicle = new Vehicle($newRecord);
					   $vehicle->save();
				   }
				 } catch (Exception $e) {
					 echo "Error: " . $e->getMessage() . "\n";
				 }

			 }
		 }
	}

}

$HIMC = new HereInMyCar();
$HIMC->populateDB();
