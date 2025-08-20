const passport = require('passport');
const authController = require('../controllers/auth.controller');

module.exports = app => {
  app.post('/api/register', authController.register);
  app.post('/api/login', authController.login);

  app.get(
    '/api/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/api/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('http://localhost:3000/profile');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};