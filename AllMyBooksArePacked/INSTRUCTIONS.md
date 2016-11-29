# Book Packer

## Purpose

This exercise is designed to test your ability to use object-oriented design principles, data structures and standard algorithms to craft a small application.  We will not only be looking at the correctness of your solution but at the style of your code, its modularity, its extensibility, and ease at which the whole package can be built and tested.  As a small team we believe these principles are a key element of our continued success. 

The problem itself is not arbritary but meant to simulate the type of work you would be doing here at Datafiniti. The transformation of unstructured data into structured data involves parsing, computationaly intensive algorithmic techniques and ultimately some method of presenting that data in a human and machine digestable format to our customers.

Have fun, be creative and ask questions! 

## Problem Description

In this repository you have been provided with the HTML source for twenty randonly chosen Amazon book pages.  

You will need to design and implement a fully functioning application that can take these pages and extract meaningful information from the raw source. 

The extracted data must contain at least the following fields:

* Title
* Author
* Price
* Shipping Weight
* ISBN-10

After extracting this information you will need to divide these twenty books into N boxes for shipping with each box having no more than ten pounds of books.

Your application should ouput its results in a valid and well structured JSON document like the example below:

```json
{
    "box": {
        "id": 1,
        "totalWeight": "1.1 pounds",
        "contents": [
            {
                "title": "The Great Big Beautiful Tomorrow",
                "author": "Cory Doctorow",
                "price": "$9.82 USD",
                "shipping_weight": "1.1 pounds",
                "isbn-10": 1604864044
            }

            . . .
        ]
    }

    . . .
}
``` 
Once your solution is completed please add an EXTENSIONS.txt file to your solution that notes how your application could be extended to handle the following:

1. Domains beyond Amazon.com
2. Products beyond just simply books.
3. Parse and ship 2,000,000 books (in a reasonably time frame; e.g., polynomial time) instead of merely 20.

To begin fork this repository to your personal Github account. We ask that you submit your solution within 2 weeks of forking the repo.

## Submission Requirements

* Any language is fine.
* You may use any third party libraries you wish. Any dependencies must be fully managed by a standard build tool for the language used.
* You must follow standard Object Oriented Design principles and techniques (e.g., submissions with only a single class are not worthy).
* Submit a pull request to this repository when you are ready to share your solution.

## What We'll Be Looking For

* Code readability and reusability (how "productized" your code is)
* Practical and sensible use of third-party code
* The computational efficiency of your sorting algorithm

## Obtaining Help

If you have any questions regarding this exercise please feel free to open a Github issue within this repository and someone from our team will be sure to answer any questions or concerns you have.
