
# The reason for me just simply putting file names here is that
# I don't expect to load files directly from disk if this were an actual system.
from bs4 import BeautifulSoup

book_list = [
    'book1.html',
    'book2.html',
    'book3.html',
    'book4.html',
    'book5.html',
    'book6.html',
    'book7.html',
    'book8.html',
    'book9.html',
    'book10.html',
    'book11.html',
    'book12.html',
    'book13.html',
    'book14.html',
    'book15.html',
    'book16.html',
    'book17.html',
    'book18.html',
    'book19.html',
    'book20.html',
]


def read_files_lazy():
    """
    Handles generating file handles files and

    :rtype: file_handle
    :return: An open file handle to a book file. I'm just returning a handle
    because I think it's more extensible than blindly reading the entire file
    into memory. To be honest, that's the approach that I'm going to take, but
    it shouldn't blindly be done--I like giving the caller an option of reading
    lines, chunking the file, &c.
    """
    for _file in book_list:
        with open('data/' + _file) as f:
            yield f


def create_soup_object(file_handle):
    """
    Takes an open file handle and creates a beautiful soup object from it.

    :param file_handle file_handle: An open file handle pointing to a test file.
    :rtype: BeautifulSoup
    :return: A beautiful soup object representing the current
    """
    html_data = file_handle.read()
    return BeautifulSoup(html_data, 'html.parser')

