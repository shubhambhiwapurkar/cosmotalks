const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birthChart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BirthChart',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;