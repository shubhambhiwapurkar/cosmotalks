const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const { getDailyContent } = require('../controllers/dailyContent.controller');

router.get('/api/daily-content', requireLogin, getDailyContent);

module.exports = router;