<?php
// William Hudgins
// Datafiniti Coding Challenge
// processAmazonBooks.php
//
// Extracts data about N books from Amazon book pages and distributes those N
//	books into M x poudn boxes using the Book, Box, Extractor, and Packer classes.
//	Requires the Book, Box, Extractor, Packer, and PackableItem classes.

// Require the necessary files once
require_once('Book.php');
require_once('Extractor.php');
require_once('Box.php');
require_once('Packer.php');
require_once('PackableItem.php');

// Predefined constants
$DIRECTORY = "data";
$BOX_CAPACITY = 10;

// Extract data from the specified directory
$extractor = new Extractor($DIRECTORY);
$book = $extractor->extractBookInfo();

// Pack the books into M boxes
$packer = new Packer($BOX_CAPACITY);
$packer->packItems($book);
$box = $packer->getBoxes();

// Output results in a readable format
echo "<pre>";
echo json_encode($box, JSON_PRETTY_PRINT);
echo "</pre>";
