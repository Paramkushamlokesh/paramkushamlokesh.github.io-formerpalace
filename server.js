const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
// Middleware to parse JSON payloads
app.use(express.json()); // Built-in JSON parser in Express
// Optional: Middleware for URL-encoded data (if you use forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Open the database
const db = new sqlite3.Database('file.db');

// API to fetch all products
app.get('/products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API to fetch products by category
app.get('/products/:category', (req, res) => {
    const category = req.params.category;
    db.all("SELECT * FROM products WHERE category = ?", [category], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API to insert a new product
app.post('/products', (req, res) => {
    const { name, category, price, image } = req.body;
    if (!name || !category || !price || !image) {
        return res.status(400).json({ error: "All fields (name, category, price, image) are required." });
    }

    const query = `INSERT INTO products (name, category, price, image) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, category, price, image], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Product added successfully", productId: this.lastID });
    });
});

app.delete('/products', (req, res) => {
    const query = `DELETE FROM products`;

    db.run(query, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "All products have been deleted successfully." });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
