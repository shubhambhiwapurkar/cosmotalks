const express = require('express');
const requireLogin = require('../middlewares/requireLogin');
const {
  getProfile,
  updateBirthChart,
} = require('../controllers/profile.controller');

const router = express.Router();

router.get('/api/profile', requireLogin, getProfile);
router.post('/api/birthchart', requireLogin, updateBirthChart);

module.exports = router;