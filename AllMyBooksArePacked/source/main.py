# Datafiniti - DataFizz challenge
# https://github.com/datafiniti/DataFizz
# AllMyBooksArePacked
#
# Mark Hess
# 04/15/2015
#
# main program flow control
#

import os

import parser
import item
import container
import boxsort
import export

# GLOBALS
LOCAL_DATA = os.path.dirname(os.getcwd()) + "/data/"
MAX_WEIGHT = 10.0


# main process control
def main_program(data_loc, sort_logic, max_weight):
    """Main program execution"""
    item_list = []
    container_list = []

    # import and clean data
    clean_data = parser.SiteParser(data_loc)
    item_list = clean_data.read_html_file()

    # apply sort logic to container
    if sort_logic == 'linear':
        boxes = boxsort.BoxSortLogic(item_list, max_weight)
    elif sort_logic == 'dynamic':
        boxes = boxsort.DynamicBoxSort(item_list, max_weight)
    else:
        print "Invalid sort logic"
    container_list = boxes.sort_books()

    # export in JSON txt file
    #export.export_json(container_list)
    print "AllMyBooksArePacked program complete."


# program initializer
if __name__ == '__main__':
    # main_program(LOCAL_DATA, 'linear', MAX_WEIGHT)
    main_program(LOCAL_DATA, 'dynamic', MAX_WEIGHT)

# HISTORY
# Initial Concept
#
# basic layout configured for box pack challenge
# Parse
# Create book objects
# Create box object
# Sort
#  - linear (optimum speed)
#  - dynamic (optimum boxes)
# Export
# Define Box sorting logic (main)
# Define dynamic box sort
#
# Revision 1
# broke up structure among multiple python module files
#
# Revision 2
# parser, item, container, and export modules complete
#
# Revision 3
# main program control implemented and built test suites
#
# Revision 4
# completed dynamic programming module
#
# Revision 5
# minor updates and tweaks
