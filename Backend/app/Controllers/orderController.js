// app/Http/Controllers/orderController.js
const db = require('../../db/database.js');
const { broadcast } = require('../../websocket.js');
const { calculateAnalytics } = require('./analyticsController.js');

const store = (req, res) => {
  const { product_id, quantity, price, date } = req.body;

  if (!product_id || !quantity || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const created_at = date || new Date().toISOString();

  const sql = `
    INSERT INTO orders (product_id, quantity, price, created_at)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [product_id, quantity, price, created_at], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const order = {
      id: this.lastID,
      product_id,
      quantity,
      price,
      created_at
    };

    broadcast({
      type: 'new_order',
      data: order
    });

    // WebSocket: التحديث اللحظي للتحليلات
    calculateAnalytics((err, analytics) => {
      if (!err) {
        broadcast({
          type: 'analytics_update',
          data: analytics
        });
      }
    });

    res.status(201).json(order);
  });
};

module.exports = {
  store
};
