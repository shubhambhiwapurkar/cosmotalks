const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const chatController = require('../controllers/chat.controller');

router.post('/api/chat', requireLogin, chatController.chat);
router.get('/api/chat/history', requireLogin, chatController.getChatHistory);

module.exports = router;