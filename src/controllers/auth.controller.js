const passport = require('passport');
const User = require('../models/user.model');

exports.register = (req, res) => {
  User.register(new User({ email: req.body.email, displayName: req.body.displayName }), req.body.password, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    passport.authenticate('local')(req, res, () => {
      res.send(user);
    });
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send(user);
    });
  })(req, res, next);
};

exports.firebaseAuth = async (req, res) => {
  const { uid, email, name } = req.user;

  try {
    let user = await User.findOne({ firebaseId: uid });

    if (!user) {
      user = new User({
        firebaseId: uid,
        email,
        displayName: name,
      });
      await user.save();
    }

    res.send(user);
  } catch (error) {
    console.error('Error in firebaseAuth controller:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.googleCallback = (req, res) => {
  res.redirect('/dashboard');
};