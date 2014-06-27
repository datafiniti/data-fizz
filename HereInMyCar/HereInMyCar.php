<?php
require_once('ConfigVars.php');
require_once(HOME_PATH . '/lib/php-activerecord/ActiveRecord.php');
require_once(HOME_PATH . '/lib/datafiniti/Client.php');

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
		    $cfg->set_default_connection(DB_ENV);
    });

		$this->dataClient_ = new Datafiniti\Client(DATAFINITI_API_KEY);
	}

	public function generateTestData($numRecordsPerFile = 20000, $numFiles = 5) {
		$randomString = function ($length = 10) {
			$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			$randstring = '';
			for ($i = 0; $i < $length; $i++) {
				$randstring .= $characters[rand(0, strlen($characters)-1)];
			}
			return $randstring;
		};

		for($i = 0; $i < $numFiles; $i++) {
			$records = array();
			echo "Generating file $i\n";

			// Generate minimally required keys for products
			for($j = 0; $j < $numRecordsPerFile; $j++) {
				echo "Generating record $j\n";
				$city = $randomString();
				$province = self::$states[array_rand(self::$states, 1)];
				$rec['merchant'][] = array('city' => $city, 'province' => $province);
				$rec['price'][] = array('amount' => rand(5000, 75000));
				$rec['key'] = $randomString(35);
				$rec['source'] = "http://" . $randomString(18) . ".com/" . $randomString(30);
				$rec['dateUpdated'] = time();
				$records[] = $rec;
				$rec['merchant'] = array();
				$rec['price'] = array();
			}
			echo "$numRecordsPerFile generated.\n";

			$json = json_encode(array('total' => count($records), 'records' => $records));
			$filename = "download.$i.json";

			file_put_contents(DOWNLOAD_PATH . '/' . $filename, $json);
		}

	 }

	public function populateDB() {
     $records = $this->dataClient_->queryProducts("vin:['' TO *] AND dateUpdated:[2014-01-01 TO *]", 'download');
		 echo "Loading records";
		 $cnt = 0;
		 foreach($records as $record) {
			 $productKey = trim($record['key']);
			 if($cnt++ % 1000 == 0) {
				 echo ".";
			 }

			 if(is_null(Vehicle::find_by_key($productKey)) 
				 && isset($record['merchant']) && isset($record['price'])
				 && isset($record['merchant'][0]['province']) && isset($record['price'][0]['amount'])) 
			 { // No duplicate keys must be inserted, nor records without province or price
				 try {
					 if(in_array($record['merchant'][0]['province'], self::$states)) { // Only insert vehicles found in US states
					   $newRecord = array('key' => $productKey, 'source' => $record['source'], 
								'price' => $record['price'][0]['amount'], 'city' => $record['merchant'][0]['city'], 'province' => $record['merchant'][0]['province']);
					   $vehicle = new Vehicle($newRecord);
						 $vehicle->date_updated = $record['dateUpdated']; // Copy constructor did not like this in the init array
					   $vehicle->save();
					 }
				 } catch (Exception $e) {
					 echo "Error: " . $e->getMessage() . "\n";
				 }
			 }
		 }
		 echo "done!\n\n";
	 }
  
	 public function displayAvgVehiclePriceByState() {
     $vehicleData = Vehicle::find('all', array('select' => 'avg(price) AS avg_price, province AS state', 'group' => 'province', 'order' => 'province asc'));
		 setlocale(LC_MONETARY, 'en_US');
		 
		 if(count($vehicleData) > 0) {
			 echo "State\tAverage Price\n";
			 foreach($vehicleData as $record) {
				 echo $record->state . "\t$" . money_format("%.2i", $record->avg_price) . "\n";
			 }
		 }
		 else {
			 echo "No relevant vehicle data in the database.\n";
		 }

	 }
}

$HIMC = new HereInMyCar();
$HIMC->populateDB();
$HIMC->displayAvgVehiclePriceByState();
