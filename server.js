const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ecommerce.db');

db.all("SELECT * FROM users LIMIT 5", [], (err, users) => {
    if (err) {
        console.error("Error fetching users:", err.message);
        return;
    }
    console.log("Users:", users);

    db.all("SELECT * FROM orders LIMIT 5", [], (err, orders) => {
        if (err) {
            console.error("Error fetching orders:", err.message);
            return;
        }
        console.log("Orders:", orders);

        db.close((err) => {
            if (err) {
                console.error("Error closing database:", err.message);
            } else {
                console.log("Database connection closed.");
            }
        });
    });
});
