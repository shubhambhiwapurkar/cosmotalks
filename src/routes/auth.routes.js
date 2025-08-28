const passport = require('passport');
const authController = require('../controllers/auth.controller');
const firebaseAuth = require('../middlewares/firebaseAuth');

module.exports = app => {
  app.post('/api/register', authController.register);
  app.post('/api/login', authController.login);
  app.post('/api/auth/firebase', firebaseAuth, authController.firebaseAuth);
  app.post('/api/test-login', authController.testLogin);

  app.get(
    '/api/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/api/auth/google/callback',
    passport.authenticate('google'),
    authController.googleCallback
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', firebaseAuth, (req, res) => {
    res.send(req.user);
  });
};