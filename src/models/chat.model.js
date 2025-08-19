const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  messages: [
    {
      sender: {
        type: String,
        enum: ['user', 'ai'],
      },
      text: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  emotion: {
    type: String,
  },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;