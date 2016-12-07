

class BaseBucket(object):
    """
    Bucket represents buckets of weight which a book is in. For instance,
    a book of weight .5 lbs is in bucket 0, a book of weight 1.3 lbs is in
    bucket 1, a book of weight 2.9 is in bucket 2, so on and so forth.

    The weight packer will put the buckets in an array where the bucket weight
    (as listed above) is its index. So the book of weight .5 would be in
    array index 0 for bucket 0. Both array indexing and dictionary lookup
    happen in constant time, so this is an easy way to get books by their
    weight consistently and in a way that will scale.

    Depending on how well we want to pack the boxes, sub buckets could be
    created to better partition the data. This, however, is a fairly naive
    implementation. However, if we were to implement further partitioning, we'd
    want to create a bucket list or some data structure which allows looking up
    data as simple as our python list. This could be implemented in constant
    time.

    PLEASE NOTE:
    I timed myself out, but my desired approach was matching boxes from
    the outer indexes indwards to hopefully optimize packing. I think had I just
    sorted the weights of all books, this would have been an unnecessary file,
    but I thought using buckets would have been an interesting approach. Oh
    well, c'est la vie.
    """
    def __init__(self, lower_limit, upper_limit):
        self.bucket_storage = self._create_bucket_driver()
        self.upper_limit = upper_limit
        self.lower_limit = lower_limit

    def _create_bucket_driver(self):
        """
        Construct bucket driver returns an object which will be the main
        storage system for the bucket. I did it in this way so that swapping
        in a simple SQLite database in place of a dictionary would be feasible.

        :rtype: dict
        :return: The base bucket only implements a dictionary as the default
        storage engine.
        """
        return {}

    def get_value(self):
        """
        A simple wrapper method around the storage driver which will allow for
        extensible retrieval of a value in the weight bucket. PLEASE NOTE: by
        default the base bucket deletes a value upon retrieval

        :rtype: tuple(str, float)
        :return: An ISBN and its weight in tuple format.
        """
        # This will return ANY value between upper_limit and lower_limit
        return self.bucket_storage.popitem()

    def set_keyvalue(self, key, value, weight):
        """
        Sets a key value in the storage driver.

        :param str key: The key (ISBN, for example).
        :param dict value: The book info.
        :param flaot weight:
        :return:
        """
        if weight < self.lower_limit or weight > self.upper_limit:
            raise ValueError(
                    'Invalid bucket for attempted value. Upper: {0} - Lower {1}'
                    ' Weight: {2} - Value: {3}'.format(
                            self.upper_limit,
                            self.lower_limit,
                            weight,
                            value,
                    )
            )

        self.bucket_storage[key] = value
