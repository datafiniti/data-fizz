function Contents(title, author, price, weight, isbn) {
    this.title = title;
    this.author = author;
    this.price = price;
    this.shipping_weight = weight;
    this.isbn10 = isbn;
}

module.exports = Contents;