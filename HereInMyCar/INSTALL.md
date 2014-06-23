# Here In My Car

## Requirements

- PHP >=5.3.10
- MySQL >=5.5 (client and server)
- libcurl and the cURL extension for PHP (and  most other standard PHP extensions)
- Latest version of PEAR
- PHinG 


## Installation

1. Install MySQL using your OS's package manager or from source
2. Install PHP 5.3.10+ with cURL extension
3. Install PEAR (http://pear.php.net/manual/en/installation.getting.php)
4. Install PHinG (using PEAR)
```
$ pear channel-discover pear.phing.info
$ pear install [--alldeps] phing/phing
```
5. Edit the ConfigVars.php file to specify your database information, and your Datafiniti API key
6. Run phing from DataFizz/HereInMyCar/
```
$ cd HereInMyCar
$ phing
```

