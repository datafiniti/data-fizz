# Running the thing
  1. `pip install -r requirements.txt`
  2. `python run_packer.py`
  3. `more output.json | python -m json.tool > out.json` 
      - This is just a simple way of pretty printing the json.

# How my parser works from a high level overview
My parser assumes files statically listed on the harddrive, but this is easy to replace with 
myriad other things. We essentially load a file at a time and parse out necessary information 
as we go. File loader -> book info parser -> book packager is the general flow.

# Additional problems
  1. Domains beyond Amazon.com
      - I made my approach fairly generic, which can be seen through the general architecture
        which I used in building parsers. Moreover, my parsers are very simple to extend through
        my base parsing class.
  2. Products beyond simple books
      - My approach was heavily targetted towards just books. If I were to approach this problem,
        I would use the same general approach, but I would make my base parser a base book parser.
  3. Parse and ship 2,000,000 books
      - My appraoch is reasonable, I never have too much loaded in memory (and with my bucket system,
        had I had time to fully implement the sorting algorithm), I could have allowed for one
        machine to easily sort and package 2 million books. However, my packaging algorithm is 
        poorly implemented--it's not slow, but it isn't remotely optional for a actual package shipping.


# Inconsistencies & other strange thoughts encountered (stuff I'd liked to have better solved)
  - Shipping weight may not always report pounds (EU kilograms, for example).
  - Ensure we don't parse same page multiple times.
    - On second thought, this is more of a crawler issue than a parser issue.
  - Only load one page in-memory at a time.
  - How does beautiful soup store information? If I call several methods passing the 
    same html string data then will it repeatedly build some unknown data structure? 
    That's super inefficient.
  - Need to allow for different book packing approaches. Weight is one way to organize 
    which books go where, but not the only way.
  - Sorting 2 million books into packaging is an interesting problem. How do we keep all 
    weight without using too much memory. I imagine I can just map the isbn-10 to its
    weight and put weight into buckets partioned at each pound. So 1 pound bucket, 2 pound 
    bucket, &c., each hold their own map. This uses much less memory than having it all 
    in memory, but I don't feel it's still optimal. We'll see what I end up making.
  - There's multiple prices for amazon. Prime price, third-party seller prices, &c.
  - One can potentially just load up to the title to get A LOT of the information (author, book title,
    isbn, but depending on the book title, parsing this can be inconsistent.
  - ISBNs aren't always accurate :\ 140006922X
  - Make sure you list out a data flow so it's easier to review and look over your code