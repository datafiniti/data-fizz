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

  // Non-uniform records are possible - this function attempts sensible probing to find the necessary data
	public static function mungeRecord($record, &$key, &$source, &$dateUpdated, &$price, &$city, &$province) {
		// Common elements to all records
		$key = isset($record['key']) ? $record['key'] : false;
		$source = isset($record['source']) ? serialize($record['source']) : false;
		$dateUpdated = isset($record['dateUpdated']) ? $record['dateUpdated'] : false;
		$price = false;
		$city = false;
		$province = false;
		$categoryArr = array();

		// Load category data as fallback
		if(isset($record['category']) && is_array($record['category'])) {
			$categoryArr = $record['category'];
		}

		// Probe merchant and price structures first - we assume this data is the most accurate
		if(isset($record['merchant']) && is_array($record['merchant'])) {
			if(isset($record['merchant'][0]['city']) && isset($record['merchant'][0]['province'])) {
				$city = ucwords(trim($record['merchant'][0]['city']));
				$province = strtoupper(trim($record['merchant'][0]['province']));
			}
		}
		
		if(isset($record['price']) && is_array($record['price'])) {
			// Amount value exists and has at least one numeral
			if(isset($record['price'][0]['amount']) && preg_match('/\d/', $record['price'][0]['amount'])) {
				$price = $record['price'][0]['amount'];
			}
		}

    // Fall back to category array for price data; if present, it's the first field
		if($price === FALSE && isset($categoryArr[0]) && preg_match('/\d/', $categoryArr[0])) {
			$price = $categoryArr[0];
		}

    // Fall back to category if no province present in merchant data; if present, it's the fifth field
		if($province === FALSE && isset($categoryArr[4]) && strstr($categoryArr[4], ',')) {
			list($city, $province) = explode(',', $categoryArr[4], 2);
			$city = ucwords(trim($city));
			$province = strtoupper(trim($province));
		}

    // If no city is present, it doesn't matter, just use "N/A"; only the province matters for the task
		if($city === FALSE || strlen($city) < 1) {
			$city = "N/A";
		}

	}

	public function populateDB() {

		try {
			$records = $this->dataClient_->queryProducts("vin:['' TO *] AND dateUpdated:[2014-06-01 TO *]", 'download');
		} catch(Exception $e) {
			die("Fatal error: $e->getMessage()\n.");
		}

		echo "Loading records";
		$cnt = 0;
		foreach($records as $record) {
			$productKey = $source = $dateUpdated = $price = $city = $province = false;
			self::mungeRecord($record, $productKey, $source, $dateUpdated, $price, $city, $province);
			
			if($cnt++ % 1000 == 0) {
				echo ".";
			}

			if($productKey !== FALSE && is_null(Vehicle::find_by_key($productKey)) && $price !== FALSE 
				&& $city !== FALSE && $province !== FALSE && $source !== FALSE && $dateUpdated !== FALSE) 
			{ // No duplicate keys must be inserted, nor records that are not minimally complete
				try {
					if(in_array($province, self::$states)) { // Only insert vehicles found in US states
						$vehicle = new Vehicle();
						$vehicle->key = $productKey;
						$vehicle->source = $source;
						$vehicle->price = $price;
						$vehicle->city = $city;
						$vehicle->province = $province;
						$vehicle->date_updated = $record['dateUpdated']; 
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
