<?php
require_once(HOME_PATH . '/lib/guzzle3/vendor/autoload.php');

class DatafinitiClient {

	private $client_ = null;
	private $apiKey_ = null;
	private $lastRequestResult_ = null;
	private $lastRequest_ = null;

	protected $dataType = null;
	protected $queryType = null;
	protected $view = null;
	protected $query = null;
	
	private $views = array('product_json', 'location_json', 'people_json'); // CSV not supported in this version
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

		switch($endpoint) {
			case self::USERS_ENDPOINT:
			  // Nothing to check	
			break;
			case self::DATA_ENDPOINT:
				if(!in_array(strtolower($this->queryType), $this->queryTypes)) {
					die("$queryType is not a valid query type. [Supported query types: " . implode(' | ', $this->queryTypes) . "]\n");
				}

				if(!in_array(strtolower($this->dataType), $this->dataTypes)) {
					die("$dataType is not a valid data type. [Supported data types: " . implode(' | ', $this->dataTypes) . "]\n");
				}

				if(!in_array(strtolower($this->view), $this->views)) {
					die("$view is not a valid view. [Supported views: " . implode(' | ', $this->views) . "]\n");
				}
			case self::STATUS_ENDPOINT:
				if(strlen(trim($this->query)) < 1) {
					die("Query is empty.\n");
				}
			break;
			default:
				die("Invalid API endpoint: $endpoint\n");
		}

		// FUTURE FEATURE: Solr syntax checker for $query
	}

	private function writeDownloadToDisk($baseURL, $resource) {
    $downloadClient = new Guzzle\Http\Client($baseURL);
	}

  // Using a modified exponential back-off technique, query the download status and then save the file once it's ready
	private function retrieveDownload($downloadID) {
		$timeoutInSeconds = 0;
		$totalTimeWaited = 0;
		$downloadIsReady = false;
		$downloadAttemptCtr = 0;

		$downloadIsReady = $this->queryStatus($downloadID);

		while(!$downloadIsReady && $downloadAttemptCtr < self::MAX_DOWNLOAD_ATTEMPTS) {
		  sleep($timeoutInSeconds);

		}
	}

	private function query($endpoint, $requestStr) {
		$this->validateQueryParams($endpoint);
		$downloadID = false;
		
		if(!in_array($endpoint, array(self::DATA_ENDPOINT, self::USERS_ENDPOINT, self::STATUS_ENDPOINT))) {
			die("Invalid query endpoint: $endpoint\n");
		}

		$request = $endpoint . $requestStr;

    var_dump($request);

		try {
			$this->lastRequest_ = $request;
		  $res = $this->client_->get($request)->send();
		}
		catch (Exception $e) {
			die("ERROR: " . $e->getMessage() . "\n");
		}

		if($this->performDownload) {
      $downloadID = $res;
			$this->retrieveDownload($downloadID);
		}
		// probably else this
		
		$statusCode = $res->getStatusCode();
		if($statusCode != 200 && $statusCode != 204) {
			die("Response status not OK: $statusCode\n");
		}

    // Save the full result for internal purposes, we will just return the decoded body for downstream use
		$this->lastRequestResult_ = $res;

    $data = json_decode($res->getBody());

    if(isset($data->error)) {
			die("Request failed at server: " . $data->error->msg);
		}

		return $data;
	}

	public function queryStatus($queryID) {
		$this->query = $queryID;
		$this->dataType = null;
		$this->view = null;
		$this->dataType = null;
		$this->performDownload = false;

		$requestStr = "/$this->query";
		$res = $this->query(self::STATUS_ENDPOINT, $requestStr);

		return $res;
	}

	public function queryUser($userID) {
		$this->query = $userID;
		$this->dataType = null;
		$this->view = null;
		$this->dataType = null;
		$this->performDownload = false;

		$requestStr = "/$this->query";
		$res = $this->query(self::USERS_ENDPOINT, $requestStr);

		return $res;
	}

	private function queryData($query, $queryType = 'preview') {
		$this->queryType = $queryType;
		$this->query = $query;
		$this->performDownload = (strtolower($this->queryType) == 'download');
		
		$requestStr = "/$this->dataType/$this->queryType?view=$this->view&q=$this->query";
		$res = $this->query(self::DATA_ENDPOINT, $requestStr);

		return $res;
	}

  // Convenience function for products
	public function queryProducts($query, $queryType = 'preview') {
		$this->dataType = 'products';
		$this->view = 'product_json';

		$res = $this->queryData($query, $queryType);
		return $res;
	}

  // Stub for locations convenience function
	public function queryLocations($query, $queryType = 'preview') {}

  // Stub for identities convenience function
	public function queryIdentities($query, $queryType = 'preview') {}

	public function validAPIUser() {
		$res = $this->queryUser($this->apiKey_);
    return ($this->lastRequestResult_->getStatusCode() == 200);
	}
}


