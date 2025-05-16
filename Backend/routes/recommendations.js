const express = require('express');
const router = express.Router();
const recommendationController = require('../app/Controllers/recommendationController.js');

router.get('/', recommendationController.getRecommendations);

module.exports = router;
