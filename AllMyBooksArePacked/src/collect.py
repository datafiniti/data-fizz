#For every book there are two options:
# 1. It goes in the box
# 2. It doesn't
#
#Let total_weight be the maximum possible weight that can be achieved for a box with any given capacity, and a list of book_weights.
#
# total_weight(capacity, book_weights[:]) = 
#     max(book_weights[0] + total_weight(capacity-book_weights[0], book_weights[1:]), 
#         total_weight(capacity, book_weights[1:]))
#
#Base Case: if (len(book_weights)==0), total_weight = 0
#
#Memoize the results? You will need to scale the weights and capacities so they are all integers. Then apply Dynamic Programming.
#
#DP table[101][n+1], for a book_list of length n.

import numpy as np

box_keys = ['id', 'totalWeight', 'contents']
capacity = 10.0
scaled_cap = int(capacity*10)
    
def populate_table(scaled_cap, scaled_weights):
    """Populate DP table
    Return the book index and table after populating values till necessary
    """
    max_row = scaled_cap + 1
    max_col = len(scaled_weights)+1
    DP = np.zeros((max_row, max_col), int)
    
    for j in range(1, max_col):
        this_weight = scaled_weights[j-1]
                
        for w in range(1, max_row):
            if ((w >= this_weight) and
                (w >= this_weight + DP[w-this_weight][j-1]) and
                (this_weight + DP[w-this_weight][j-1] > DP[w][j-1])):                
                    DP[w][j] = this_weight + DP[w-this_weight][j-1]                
            else:
                DP[w][j] = DP[w][j-1]
                
        if DP[w][j] == scaled_cap:
            return (j, DP)
    return (max_col-1, DP)

def print_table(table):
    """Prints table with row indexes at the left"""
    row_index = 0
    for row in table:
        print row, row_index
        row_index+=1

def collect_to(box_id, books, scaled_weights):
    """Collect books from inventory to box
    
    Returns (box, books) with books not filled in the box
    """
    #print "\n\n****Collecting on box", box_id, ":: Books in inventory = ", len(books), "****\n"
    contents = []
    totalWeight = 0.0
    
    (book_index, DP) = populate_table(scaled_cap, scaled_weights)

    #print_table(DP)
    #print scaled_weights

    weight_index = scaled_cap
    
    while weight_index>0 and book_index>0:        
        if (DP[weight_index][book_index]==0):
            break        
        while DP[weight_index][book_index] == DP[weight_index][book_index-1]:
            book_index -= 1        
        contents.append(books[book_index-1])
        totalWeight += books[book_index-1]['shipping_weight']
        weight_index -= scaled_weights[book_index-1]        
        #print "book_index", book_index, ": Weight", books[book_index-1]['shipping_weight'], ":weight_index", weight_index, ":: TotalWeight", totalWeight
        del(books[book_index-1])
        del(scaled_weights[book_index-1])
        book_index -= 1
    
    box = dict(zip(box_keys, (box_id, totalWeight, contents)))
    return (box, books, scaled_weights)
