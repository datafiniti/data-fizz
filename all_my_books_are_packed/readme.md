Amazon Book Scraper and Book Packer

1. Clone this repo
2. Navigate to `/all_my_books_are_packed`
2. Install dependencies `bundle install`
3. Create the database `rake db:create`
4. Run pending migrations `rake db:migrate`
5. Run scrape/box task 'rake scrape_and_box:amazon'
6. Boot up server `rails s`
7. make `GET` request to `api/shipments`
