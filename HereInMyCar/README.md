# Here In My Car

## Purpose

This challenge will test your ability to access, manipulate and analyze a large data set.  We will not only be looking at the correctness of your solution, but also the style of your code, its readability, and ease at which the whole package can be built and tested.

The problem itself is designed as a "light" version of the work you'll be doing at Datafiniti.

## Problem Description

Prior to starting this challenge, you should receive a Datafiniti API token. Using this token, we'd like you to write a small application or script that does the following:

1. Downloads a data set of approximately 100,000 auto records from Datafiniti
2. Loads the data into a MySQL database
3. Calculates the average price of a car for each state and prints the results

## Downloading the Data Set

Use the information available on our [knowledge base](https://datafiniti.groovehq.com/help_center) to learn how to construct Datafiniti API calls.  We recommend experimenting with a few preview calls to get a feel for the data before running a download crawl.  The API token you've been provided will only allow up to 100,000 downloaded records, so be sure you know what query you're running before initiating a download.  If you'd like to test your code on small download calls, we recommend limiting the # of records downloaded by using the dateUpdated attribute.  If you do run out of credits, just email us to ask for more.

The data set you'll want your script to download should consist of up to 100,000 product records containing a [VIN](http://en.wikipedia.org/wiki/Vehicle_identification_number).

## Submission Requirements

* Any language is fine
* You may use any third party libraries you wish. Any dependencies must be fully managed by a standard build tool for the language used.
* Submit a pull request to this repository when you are ready to share your solution.

## What We'll Be Looking For

* Code readability and reusability (how "productized" your code is)
* Practical and sensible use of third-party code

## Obtaining Help

If you have any questions regarding this challenge, please email us.
