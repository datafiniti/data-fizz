from extract import extract

books = extract(20)

box_keys = ['id', 'totalWeight', 'contents']

capacity = 10.0
total_weight = 0.0
book_weights = [book['shipping_weight'] for book in books]

#Let's make a box
box = {'id':1, 'totalWeight':0, 'contents':[]}
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
#DP table[101][n+1], for a book_list of length n.

scale_cap = int(capacity*10)
scale_weight = [int(x*10) for x in book_weights]

max_row = scale_cap + 1
max_col = len(scale_weight)+1
DP = [[-1 for i in range(max_col)] for j in range(max_row)]

#Total weight is zero for capacity of zero.
for j in range(max_col):
    DP[0][j] = 0

#Total weight is zero for no books
for i in range(max_row):
    DP[i][0] = 0

#Populate table
#i represents current capacity of the box
#j represents book index
for j in range(1, max_col):
    this_weight = scale_weight[j-1]
    for w in range(1, max_row):
        if ((w >= this_weight) and
            (w >= this_weight + DP[w-this_weight][j-1]) and
            (this_weight + DP[w-this_weight][j-1] > DP[w][j-1])):                
                DP[w][j] = this_weight + DP[w-this_weight][j-1]
        else:
            DP[w][j] = DP[w][j-1]

def print_table(table):
    """Prints table with row indexes at the left"""
    row_index = 0
    for row in table:
        print row_index, row
        row_index+=1

print_table(DP)
print scale_weight

#box['totalWeight'] = DP[max_row][max_col]

print len(DP)

def find_box_books(DP, books):
    DP_book_index = len(books) + 1
    
    pass
box['contents'] = find_box_books(DP, books)
