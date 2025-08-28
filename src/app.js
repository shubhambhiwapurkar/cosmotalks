const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();
const admin = require('firebase-admin');

if (process.env.NODE_ENV !== 'test') {
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('ascii')
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const requiredEnvVars = ['MONGO_URI', 'COOKIE_KEY', 'FIREBASE_SERVICE_ACCOUNT'];
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      console.error(`Error: Missing required environment variable: ${varName}`);
      process.exit(1);
    }
  }
}

require('./models/user.model');
require('./services/passport');

const app = express();

function init() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'test') {
      mongoose.connect(process.env.MONGO_URI)
        .then(() => {
          console.log('Connected to MongoDB');
          resolve(app);
        })
        .catch(err => {
          console.error('Failed to connect to MongoDB', err);
          process.exit(1);
        });
    } else {
      resolve(app);
    }
  });
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
    origin: ['http://localhost:3000', 'https://your-frontend-url.com', 'https://cosmostudio--cosmotherapy2008.europe-west4.hosted.app'],
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

module.exports = { app, init };