# Crawling Challenge

### Requirements
  - use JavaScript and any third party libraries you want, follow OOP principles and techniques
  - crawler must navigate from a “starting url” to a “listing page” on the website
  - from the starting url, the home page, navigate to the books category
  - collect at least ten books and grab the following information

    ```
    "book": {
      "name": "To Kill a Mockingbird",
      "listPrice": "$27.99",
      "description": "The site's description of the book.",
      "dimensions": "10x7x1 inches",
      "imageURLs": [
          "https://images-na.ssl-images.com/images/I/611AZDSUHvL._SY496_BO1,204,203,200_.jpg",
          "https://images-na.ssl-images.com/images/I/81ECOQVXVGL.jpg"
      ],
      "weight": "1.2 lbs",
      "sourceURL": "https://www.example.com/1234567890"
    }
    ```
### Installation and Use

In your terminal, in the desired directory, type the following:
```
git clone git@github.com:LallieDragon/crawler-js.git && cd crawler-js && npm install
```
To run the app, simply type the following into your terminal while in crawler-js
```
node index.js
```

### My Knowledge Coming into This Test

I was assigned this test in order to schedule an interview. I had never heard of web crawlers before, and my (near) vanilla JS skills were a bit rusty. Upon doing some research, crawlers are Internet bots that systematically browse the WWW, typically for the purpose of Web indexing. Ok, I understand that part... but how? The answer is Cheerio and Request.

I had no experience with either, so I dove into Request. I then realized the perfect tool for parsing this information from websites was jQuery. Well, duh, you say. Since I began my journey as a web developer, my peers and coworkers had always said jQuery is dying, don't bother learning it. I bothered to learn the basics the last few days and have really grown to appreciate it.

Using jQuery to select the elements and hrefs that I need, I use my callback functions to send data back to main(). The urls are passed down the line of functions until I get the book urls that I need, then using those urls, I grab the required information off of the page.

### Problems I Encountered

This crawler doesn't work 100% of the time. Even setting setTimeout to various lengths of time has not enabled me to consistently use the crawler. The user-agent is recognized at times by amazon who refuses the connection. If you continue running

```
node index.js
```

it will eventually write the resulting book information to results.js.
