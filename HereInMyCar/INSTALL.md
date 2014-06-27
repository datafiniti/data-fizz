# Here In My Car

## Requirements

- PHP >=5.3.10
- MySQL >=5.5 (client and server)
- curl command line executable
- PHP extensions: cURL
- Latest version of PEAR
- Composer for PHP
- PHinG 


## Installation

1. Install MySQL 5.5+ (server and client) using your OS's package manager
2. Install curl using your OS's package manager
3. Install PHP 5.3.10+ with cURL and Phar extensions using your OS's package manager (Phar is included in PHP >=5.3) 
4. Install PEAR (See: http://pear.php.net/manual/en/installation.getting.php)
5. Install PHinG using PEAR (See: http://www.phing.info/)
   ```
   $ pear channel-discover pear.phing.info
   $ pear install [--alldeps] phing/phing
   ```
6. Edit the ConfigVars.php file to specify your database information, and your Datafiniti API key
7. Run phing from DataFizz/HereInMyCar/
   ```
   $ cd HereInMyCar
   $ phing
   ```
8. Run the application
   ```
	 $ php HereInMyCar.php
	 ```

