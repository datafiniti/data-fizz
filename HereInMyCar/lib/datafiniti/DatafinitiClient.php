<?php
require_once('../guzzle3/vendor/autoload.php');

class DatafinitiClient {

	private $client_ = null;
	private $apiKey_ = null;

	public $dataType = null;
	public $queryType = null;
	public $view = null;
	public $query = null;
	
	private $views = array('product_json', 'location_json', 'people_json', 'product_csv', 'location_csv', 'people_csv');
  private $queryTypes = array('preview', 'download');
	private $dataTypes = array('products', 'locations', 'identities');

	const API_URL = 'https://api.datafiniti.net';
	const USERS_ENDPOINT = '/v2/users';
	const DATA_ENPOINT = '/v2/data';
	const STATUS_ENDPOINT = '/v2/status';

	function __construct($apiKey = 'vd95mqywso522sdcrg4lxxosrdwtwdq6') {
		$this->apiKey_ = $apiKey . "sdfsdf";
		$this->client_ = new Guzzle\Http\Client(self::API_URL); 
		$this->client_->getConfig()->setPath('request.options/auth', array($this->apiKey_, '', 'Basic'));
		if(!$this->validAPIUser()) {
			die("$this->apiKey_ is not a valid API key.");
		}
	}

	public function validateQueryParams() {
		if(!in_array($this->queryType, $this->queryTypes)) {
			die("$queryType is not a valid query type. [" . implode('|', $this->queryTypes) . "]\n");
		}

		if(!in_array($this->dataType, $this->dataTypes)) {
			die("$dataType is not a valid data type. [" . implode('|', $this->dataTypes) . "]\n");
		}

		if(!in_array($this->view, $this->views)) {
			die("$view is not a valid view. [" . implode('|', $this->views) . "]\n");
		}

		// FUTURE FEATURE: Solr syntax checker for $query

		return true;
	}

	public function query() {
		$this->validateQueryParams();
		return $this->client_->get(self::DATA_ENDPOINT . "/$this->dataType/$this->queryType?view=$this->view&q=$query")->send();
	}

  // Convenience function for products
	public function queryProducts($query, $queryType = 'preview', $view = 'product_json') {
		$this->dataType = 'products';
		$this->queryType = $queryType;
		$this->view = $view;
    $this->query = $query;

		$res = $this->query();
		return $res;
	}

	public function validAPIUser() {
		$res = $this->client_->get(self::USERS_ENDPOINT . '/' . $this->apiKey_)->send();
    return ($res->getStatusCode() == 200);
	}
}

$test = new DatafinitiClient();
$res = $test->queryProducts("vin:['' TO *] AND dateUpdated:[2014-06-14 TO *]");
echo $res->getStatusCode();           // 200
echo $res->getHeader('Content-Type'); // 'application/json; charset=utf8'
echo $res->getBody();                 // {"type":"User"...'


