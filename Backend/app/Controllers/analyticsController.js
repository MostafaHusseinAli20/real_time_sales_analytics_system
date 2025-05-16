const db = require('../../db/database.js');

function calculateAnalytics(callback) {
  const now = new Date();
  const oneMinuteAgo = new Date(now.getTime() - 60 * 1000).toISOString();

  const queries = {
    totalRevenue: `SELECT SUM(price * quantity) AS revenue FROM orders`,
    topProducts: `
      SELECT product_id, SUM(quantity) AS total_quantity
      FROM orders
      GROUP BY product_id
      ORDER BY total_quantity DESC
      LIMIT 5
    `,
    revenueLastMinute: `
      SELECT SUM(price * quantity) AS revenue
      FROM orders
      WHERE created_at >= ?
    `,
    ordersLastMinute: `
      SELECT COUNT(*) AS count
      FROM orders
      WHERE created_at >= ?
    `
  };

  const results = {};

  db.get(queries.totalRevenue, [], (err, row) => {
    if (err) return callback(err);
    results.total_revenue = row.revenue || 0;

    db.all(queries.topProducts, [], (err, rows) => {
      if (err) return callback(err);
      results.top_products = rows;

      db.get(queries.revenueLastMinute, [oneMinuteAgo], (err, row) => {
        if (err) return callback(err);
        results.revenue_last_minute = row.revenue || 0;

        db.get(queries.ordersLastMinute, [oneMinuteAgo], (err, row) => {
          if (err) return callback(err);
          results.orders_last_minute = row.count;

          callback(null, results);
        });
      });
    });
  });
}

const getAnalytics = (req, res) => {
  calculateAnalytics((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = { 
  getAnalytics,
  calculateAnalytics
};