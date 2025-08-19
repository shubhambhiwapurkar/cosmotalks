const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();
require('./models/user.model');
require('./services/passport');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI);
}

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(require('./routes/dailyContent.routes'));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

require('./routes/auth.routes')(app);
app.use(require('./routes/profile.routes'));
app.use(require('./routes/chat.routes'));

app.get('/', (req, res) => {
  res.send('AI Astrology Chatbot Backend');
});

module.exports = app;