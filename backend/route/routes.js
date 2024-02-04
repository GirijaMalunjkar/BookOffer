const express = require('express');
const router = express.Router();

// Import User and Book models
const { User, Book } = require('../models/Bookoffer');

// Add-User
router.post("/User", async (req, res) => {
    try {
        console.log(req.body);

        let newUser = new User({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email
        });

        const result = await newUser.save();
        res.json({ msg: "Added" });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Add-Book
router.post("/Book", async (req, res) => {
    try {
        console.log(req.body);

        let newBook = new Book({
            book: req.body.book,
            author: req.body.author,
            genre: req.body.genre,
            yop: req.body.yop,
            isbn: req.body.isbn
        });

        const result = await newBook.save();
        res.json({ msg: "Added" });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Update book offer
router.put("/update_Book/:id", async (req, res) => {
    const bookOfferId = req.params.id;
    const { book, author, genre, yop, isbn } = req.body;

    try {
        const bookOffer = await Book.findById(bookOfferId);

        if (!bookOffer) {
            return res.status(404).json({ msg: "Book offer not found" });
        }

        if (book) bookOffer.book = book;
        if (author) bookOffer.author = author;
        if (genre) bookOffer.genre = genre;
        if (yop) bookOffer.yop = yop;
        if (isbn) bookOffer.isbn = isbn;

        const result = await bookOffer.save();
        res.json({ msg: "Updated" });
    } catch (error) {
        console.error('Error updating book offer:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Delete book offer
router.delete("/delete_Book/:id", async (req, res) => {
    const bookOfferId = req.params.id;

    try {
        const result = await Book.findByIdAndDelete(bookOfferId);

        if (!result) {
            return res.status(404).json({ msg: "Book offer not found" });
        }

        res.json({ msg: "Deleted" });
    } catch (error) {
        console.error('Error deleting book offer:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

module.exports = router;
