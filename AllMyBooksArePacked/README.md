# Book Packer -- Report

## Description

I completed this coding challenge using Java, and I used Maven to handle dependencies, JUnit tests, and packaging. Aside from JUnit, the two other third-party libraries I used were:

* [**jsoup**](https://jsoup.org): for parsing and extracting data from HTML files, and
* [**Gson**](https://github.com/google/gson): for simple JSON serialization that offers easy pretty printing as well as custom serialization.

## Usage

In a Linux system, after building the `bookpacker` package by running `mvn package` in the directory containing `pom.xml`, you should be able to use the program by running:
```bash
java -jar target/bookpacker-1.jar [file1.html [file2.html ...]]
```

This will extract the data from each of the files and then use the First Fit Decreasing algorithm for Bin Packing to organize the books according to their shipping weight. The output is a JSON array of bins, each of which contains an array of books. To run the program on the sample data provided, run the following bash command:
```bash
java -jar target/bookpacker-1.jar data/*
```

