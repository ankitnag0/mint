const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const user = await User.findOne({ email });
  if (!user) {
    return done(null, false, { message: 'Incorrect email or password' });
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return done(null, false, { message: 'Incorrect email or password' });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;