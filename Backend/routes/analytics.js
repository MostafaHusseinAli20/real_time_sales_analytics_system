const express = require('express');
const router = express.Router();
const analyticsController = require('../app/controllers/analyticsController.js');

router.get('/', analyticsController.getAnalytics);

module.exports = router;
