const sqlite3 = require('sqlite3').verbose();

// Create or open the database
const db = new sqlite3.Database('file.db');

db.serialize(() => {
    // Create the products table
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        category TEXT,
        price REAL,
        image TEXT
    )`);

    // Insert sample data
    const stmt = db.prepare(`INSERT INTO products (name, category, price, image) VALUES (?, ?, ?, ?)`);
    stmt.run("Fresh Milk", "Milk Products", 50, "https://via.placeholder.com/200");
    stmt.run("Cheese", "Milk Products", 100, "https://via.placeholder.com/200");
    stmt.run("Apples", "Fruits", 80, "https://via.placeholder.com/200");
    stmt.run("Carrots", "Vegetables", 40, "https://via.placeholder.com/200");
    stmt.run("Bananas", "Fruits", 60, "https://via.placeholder.com/200");
    stmt.finalize();
});

db.close();
console.log("Database setup complete!");
