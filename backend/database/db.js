const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database (it will create the database file if it doesn't exist)
const db = new sqlite3.Database('./transactions.db', (err) => {
    if (err) {
        console.error('Database connection error: ', err);
    } else {
        console.log('Connected to SQLite database');
        // Create the table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                collect_id TEXT NOT NULL,
                school_id TEXT NOT NULL,
                gateway TEXT NOT NULL,
                order_amount REAL NOT NULL,
                transaction_amount REAL NOT NULL,
                status TEXT NOT NULL,
                custom_order_id TEXT NOT NULL
            );
        `, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Table "transactions" is ready.');
            }
        });
    }
});

module.exports = db;
