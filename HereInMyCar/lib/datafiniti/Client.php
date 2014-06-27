<?php
namespace Datafiniti;

require_once(HOME_PATH . '/lib/guzzle3/vendor/autoload.php');
require_once('RecordSet.php');

class Client {

	private $views = array('product_json', 'location_json', 'people_json'); // CSV not supported in this version
  private $queryTypes = array('preview', 'download'); // Query types supported by data endpoint
	private $dataTypes = array('products'); // Locations and identities not supported in this version

	private $client_ = null;
	private $apiKey_ = null;
	private $lastRequestResult_ = null;
	private $lastRequest_ = null;

	protected $dataType = null;
	protected $queryType = null;
	protected $view = null;
	protected $query = null;
	
	const API_URL = 'https://api.datafiniti.net';
	const USERS_ENDPOINT = '/v2/users';
	const DATA_ENDPOINT = '/v2/data';
	const STATUS_ENDPOINT = '/v2/status';
	const MAX_DOWNLOAD_ATTEMPTS = 13;

	function __construct($apiKey) {
		$this->apiKey_ = $apiKey;
		$this->client_ = new \Guzzle\Http\Client(self::API_URL); 
		$this->client_->getConfig()->setPath('request.options/auth', array($this->apiKey_, '', 'Basic'));
		if(!$this->validAPIUser()) {
			die("$this->apiKey_ is not a valid API key.");
		}
	}
	
	// Performs validations checks on object members
	public function validateQueryParams($endpoint) {

		switch($endpoint) {
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
			case self::USERS_ENDPOINT:
			case self::STATUS_ENDPOINT:
				if(strlen(trim($this->query)) < 1) {
					die("Query is empty for $endpoint.\n");
				}
			break;
			default:
				die("Invalid API endpoint: $endpoint\n");
		}

		// FUTURE FEATURE: Solr syntax checker for $query
	}

  // Write the file to downloads directory and return the filename
	private function writeQueryFileToDisk($baseURL, $resource) {

		try {
			$downloadClient = new \Guzzle\Http\Client($baseURL);
			$res = $downloadClient->get($resource)->send();
			$URLParts = parse_url($resource);
			
			if(!isset($URLParts['path'])) {
				throw new Exception("Missing path in resource [URL:$baseURL resource:$resource].");
			}
			
			$tmp = explode('/', $URLParts['path']);
			$filename = $tmp[count($tmp)-1]; // Filename is tail end of resource; should consider prepending a timestamp/guid
			$filename = DOWNLOAD_PATH . '/' . $filename;

			$saveFileStream = \Guzzle\Http\EntityBody::factory(fopen($filename, 'w+'));
			$saveFileStream->write($res->getBody());
			$saveFileStream->close();
    }
		catch (Exception $e) {
			die("ERROR: Failed to save query file - " . $e->getMessage() . "\n");
		}
		
		return $filename;
	}

  // Using an exponential back-off, query the download status and then save the file once it's ready
	// The function will spend approx. a total of (1 - $timeoutMultiplier^(MAX_DOWNLOAD_ATTEMPTS)) / (1 - $timeoutMultiplier) seconds making attempts 
	private function retrieveDownload($queryID) {
		$timeoutInMicroSeconds = 1000;
		$downloadIsReady = false;
		$downloadHasFailed = false;
		$downloadAttemptCtr = 0;
		$timeoutMultiplier = 1.8;
		$queryResponse = null;

		do {
			usleep((int)$timeoutInMicroSeconds);
			$downloadAttemptCtr++;
			$queryResponse = $this->queryStatus($queryID);

			$downloadIsReady = ($queryResponse['state'] == "done");
			$downloadHasFailed = ($queryResponse['state'] == "failed");
		 
			$timeoutInMicroSeconds = max(1000, $timeoutMultiplier * $timeoutInMicroSeconds); // At least wait 1 second, in case of weird overflow/underflow  
		} while (!$downloadIsReady && !$downloadHasFailed && $downloadAttemptCtr < self::MAX_DOWNLOAD_ATTEMPTS);

		if($downloadHasFailed || $downloadAttemptCtr == self::MAX_DOWNLOAD_ATTEMPTS) {
			$error = "Maximum download attempts exceeded for query $queryID [" . self::MAX_DOWNLOAD_ATTEMPTS . '.';
			if($downloadHasFailed) {
				$error = "Download failed to complete at server.";
			}
			die($error);
		}

		// Download is complete and ready to transfer
    $downloadURL = $queryResponse['url'];
		$URLParts = parse_url($downloadURL);
		$baseURL = $URLParts['scheme'] . '://' . $URLParts['host'];
		$resource = $URLParts['path'];

		if(strlen($URLParts['query']) > 0) {
			$resource .= '?' . $URLParts['query'];
		}
    
		return $this->writeQueryFileToDisk($baseURL, $resource);

	}

	private function query($endpoint, $requestStr) {
		$this->validateQueryParams($endpoint);
		
		if(!in_array($endpoint, array(self::DATA_ENDPOINT, self::USERS_ENDPOINT, self::STATUS_ENDPOINT))) {
			die("Invalid query endpoint: $endpoint\n");
		}

		$request = $endpoint . $requestStr;

		try {
			$this->lastRequest_ = $request;
		  $res = $this->client_->get($request)->send();
		}
		catch (Exception $e) {
			die("Request error: " . $e->getMessage() . "\n");
		}

		$statusCode = $res->getStatusCode();
		if($statusCode != 200 && $statusCode != 204) {
			die("Query failed - Response status not OK: $statusCode\n");
		}

    // Save the full result for internal purposes, we will just return the decoded body for downstream use
		$this->lastRequestResult_ = $res;

    // Throw body into data decoded from JSON as assoc array, except for data download queries - they are simple text responses
    $data = $res->getBody();
		if($this->queryType != 'download') {
			$data = json_decode($data, true);
			$jsonError = json_last_error();
			if($jsonError != 0) {
				throw new Exception("Client::query() JSON decoding error: $jsonError");
			}
		}

    if(isset($data['error'])) {
			die("Request failed at server: " . $data['error']['msg']);
		}

		return $data;
	}

  // Convenience function for query status data
	public function queryStatus($queryID) {
		$this->query = $queryID;
		$this->queryType = null;
		$this->view = null;
		$this->dataType = null;

		$requestStr = "/$this->query";
		$res = $this->query(self::STATUS_ENDPOINT, $requestStr);

		return $res;
	}

  // Convenience function for user data
	public function queryUser($userID) {
		$this->query = $userID;
		$this->queryType = null;
		$this->view = null;
		$this->dataType = null;

		$requestStr = "/$this->query";
		$res = $this->query(self::USERS_ENDPOINT, $requestStr);

		return $res;
	}

  // General query method for data; returns an array of records for preview queries, or an archive filename for download queries
	private function queryData($query, $queryType = 'preview') {
		$this->queryType = $queryType;
		$this->query = $query;
		
		$requestStr = "/$this->dataType/$this->queryType?view=$this->view&q=$this->query";
		$res = $this->query(self::DATA_ENDPOINT, $requestStr);
		
		// Handle download query types; the prior result is a queryID that may be in process
		if($this->queryType == 'download') {
			$res = $this->retrieveDownload($res);
		}
		else {
			$res = $res['records'];
		}

		return $res;
	}

  // Convenience function for products, returns a RecordSet (ArrayIterator)
	public function queryProducts($query, $queryType = 'preview') {
		$this->dataType = 'products';
		$this->view = 'product_json';

		$res = $this->queryData($query, $queryType);
		
		return new \RecordSet($res);
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


