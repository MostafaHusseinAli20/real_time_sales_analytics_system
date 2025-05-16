const db = require("../../db/database.js");

const getRecommendations = (req, res) => {
  db.all(
    `
    SELECT product_id, COUNT(*) AS count
    FROM orders
    GROUP BY product_id
    ORDER BY count DESC
  `,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      const suggestions = [];

      if (rows.length === 0) {
        suggestions.push(
          "🚫 Not enough data to generate recommendations at the moment."
        );
      } else {
        const topProduct = rows[0];
        suggestions.push(
          `✅ Promote product #${topProduct.product_id} as it is the top seller (${topProduct.count} orders).`
        );

        if (rows.length >= 2) {
          const lowProduct = rows[rows.length - 1];
          suggestions.push(
            `📉 Consider offering a discount on product #${lowProduct.product_id} as it is the least sold (${lowProduct.count} orders only).`
          );
        }

        if (rows.length >= 3) {
          suggestions.push(
            `🌟 Try bundling product #${rows[0].product_id} with #${rows[1].product_id} for a promotional offer.`
          );
        }
      }

      // رجّع آخر 10 طلبات للعرض
      db.all(
        `SELECT * FROM orders ORDER BY created_at DESC LIMIT 10`,
        (err2, orders) => {
          if (err2) return res.status(500).json({ error: err2.message });

          res.json({
            suggestions,
          });
        }
      );
    }
  );
};

module.exports = {
  getRecommendations,
};
