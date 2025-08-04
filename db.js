const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');

const db= new sqlite3.Database('data.db');
exports.db = db;
db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    product TEXT,
    amount REAL,
    date TEXT


)`);

fs.createReadStream('users.csv').pipe(csv()).on('data', (row) => {
    db.run(`INSERT INTO users (id, name, email,gender, age) VALUES (?, ?, ?, ?, ?)`,
        [row.id,
             row.name, row.email ,row.gender, row.age]
    );
});

fs.createReadStream('orders.csv').pipe(csv()).on('data', (row) => {
    db.run(`INSERT INTO orders (id, user_id, product, amount, date) VALUES (?, ?, ?, ?, ?)`,
        [row.id,
             row.user_id, row.product, row.amount, row.date]
    );
});
console.log('CSv files are being loaded into the database.');