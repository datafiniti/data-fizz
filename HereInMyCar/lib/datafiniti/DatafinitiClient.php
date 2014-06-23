<?php
require_once(HOME_PATH . '/lib/guzzle3/vendor/autoload.php');

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
	const DATA_ENDPOINT = '/v2/data';
	const STATUS_ENDPOINT = '/v2/status';
	const MAX_DOWNLOAD_ATTEMPTS = 16;

	function __construct($apiKey) {
		$this->apiKey_ = $apiKey;
		$this->client_ = new Guzzle\Http\Client(self::API_URL); 
		$this->client_->getConfig()->setPath('request.options/auth', array($this->apiKey_, '', 'Basic'));
		if(!$this->validAPIUser()) {
			die("$this->apiKey_ is not a valid API key.");
		}
	}

	public function validateQueryParams($endpoint) {

    if($endpoint != self::DATA_ENDPOINT) {
			return true;
		}
		
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

	private function saveDownload($baseURL, $resource) {
    $downloadClient = new Guzzle\Http\Client($baseURL);
	}

  // Using a modified exponential back-off technique, query the download status and then save the file once it's ready
	private function retrieveDownload($downloadID) {
		$timeoutInSeconds = 1;
		$downloadIsReady = false;
		$downloadAttemptCtr = 0;

		while(!$downloadIsReady && $downloadAttemptCtr < self::MAX_DOWNLOAD_ATTEMPTS) {
		  sleep($timeoutInSeconds);

		}
	}

	private function query($endpoint) {
		$this->validateQueryParams($endpoint);
		$handleDownload = false;
		$downloadID = false;
		
		switch($endpoint) {
			case self::DATA_ENDPOINT:
		    $request = self::DATA_ENDPOINT . "/$this->dataType/$this->queryType?view=$this->view&q=$this->query";
				$handleDownload = (strtolower($this->queryType) == 'download');
			break;
			case self::USERS_ENDPOINT:
			  $request = self::USERS_ENDPOINT . "/$this->query";
			break;
			case self::STATUS_ENDPOINT:
			  $request = self::STATUS_ENDPOINT . "/$this->query";
			break;
			default:
			  die("Invalid query endpoint: $endpoint\n");
		}
		var_dump($request);

		$res = $this->client_->get($request)->send();

		if($handleDownload) {
      $downloadID = $res;
			$this->retrieveDownload($downloadID);
		}
		// probably else this
		
		$statusCode = $res->getStatusCode();
		if($statusCode != 200 && $statusCode != 204) {
			die("Response status not OK: $statusCode\n");
		}

    $data = json_decode($res->getBody());

    if(isset($data->error)) {
			die("Request failed: " . $data->error->msg);
		}

		return $data;
	}

	public function queryStatus($queryID) {
		$this->query = $queryID;
		$res = $this->query(self::STATUS_ENDPOINT);

		return $res;
	}

  // Convenience function for products
	public function queryProducts($query, $queryType = 'preview', $view = 'product_json') {
		$this->dataType = 'products';
		$this->queryType = $queryType;
		$this->view = $view;
    $this->query = $query;

		$res = $this->query(self::DATA_ENDPOINT);
		return $res;
	}

	public function validAPIUser() {
		try {
		  $res = $this->client_->get(self::USERS_ENDPOINT . '/' . $this->apiKey_)->send();
      return ($res->getStatusCode() == 200);
		}
		catch(Exception $e) {
       die("Connection error: " . $e->getMessage() . "\n");
		}
	}
}


