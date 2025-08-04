const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('data.db');

app.use(cors());
app.use(express.json());

// Get paginated customers
app.get('/customers', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    db.all(`SELECT * FROM users LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ page, limit, customers: rows });
    });
});

// Get a customer by ID with order count
app.get('/customers/:id', (req, res) => {
    const customerId = req.params.id;

    db.get(`SELECT * FROM users WHERE id = ?`, [customerId], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        db.get(`SELECT COUNT(*) AS orderCount FROM orders WHERE user_id = ?`, [customerId], (err, countRow) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            user.orderCount = countRow.orderCount;
            res.json(user);
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/customers/:id/orders', (req, res) => {
    const customerId = req.params.id;
    const sql = `SELECT * FROM orders WHERE user_id = ?`;

    db.all(`SELECT * FROM orders WHERE user_id = ?`, [customerId], (err, orders) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if(rows.length === 0) {
            return res.status(404).json({ error: 'No orders found for this customer' });
        }   
        res.json(orders);
    });
});

app.get('/orders/id', (req, res) => {
    const orderId = req.params.id;
    const sql = `SELECT * FROM orders WHERE id = ?`;

    db.get(`SELECT * FROM orders WHERE id = ?`, [orderId], (err, order) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    });
});
