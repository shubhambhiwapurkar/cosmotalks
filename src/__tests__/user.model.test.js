const mongoose = require('mongoose');
const User = require('../models/user.model');

describe('User Model', () => {
  it('should create a new user', async () => {
    const userData = {
      googleId: '12345',
      displayName: 'Test User',
      email: 'test@example.com',
      photo: 'test.jpg',
    };
    const user = new User(userData);
    await user.save();
    expect(user).toHaveProperty('_id');
  });

  it('should not create a user without an email', async () => {
    const userData = {
      displayName: 'Test User',
      googleId: '12345',
    };
    const user = new User(userData);
    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });
});