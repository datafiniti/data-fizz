from extract import extract

books = extract(20)

box_keys = ['id', 'totalWeight', 'contents']

capacity = 10.0
total_weight = 0.0
book_weights = [book['shipping_weight'] for book in books]

#Let's make a box
#
#For every book there are two options:
#1. It goes in the box
#2. It doesn't
#
#Let total_weight be the maximum possible weight that can be achieved for a box with given capacity, and a list of book_weights.
#
# total_weight(capacity, book_weights[:]) = 
#   max(book_weights[0] + total_weight(capacity-book_weights[0], book_weights[1:]), total_weight(capacity, book_weights[1:]))
#
#Base Cases: if (book_weight[-1]>capacity), total_weight = 0
#
#Memoize the results? You will need to scale the weights and capacities so they are all integers. Then apply Dynamic Programming.
#
#DP table[n+1][101], for a book_list of length n.

print book_weights    
