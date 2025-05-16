require('dotenv').config();
const express = require('express');
const http = require('http');
const orderRoutes = require('./routes/orders.js');
const analyticsRoutes = require('./routes/analytics.js');
const { initWebSocket } = require('./websocket.js');
const recommendationRoutes = require('./routes/recommendations');
const weatherRoutes = require('./routes/weather');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());

// Middleware: استقبل JSON
app.use(express.json());

// Routes
app.use('/orders', orderRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/weather', weatherRoutes);

// WebSocket setup
initWebSocket(server);

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
