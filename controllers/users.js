const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration/index');

const signToken = user => {
  return JWT.sign({
    iss: 'codeWorkr',
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET);
}
module.exports = {
  signup: async(req, res, next) => {
    console.log('user controller signup');

    const { email, password } = req.value.body;

    // check if there is a user with the same email
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    // create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    // response with token
    // res.json({ user: 'created' });
    const token = signToken(newUser);

    res.status(200).json({token});
  },
  signin: async(req, res, next) => {
    console.log('user controller signin');
  },
  secret: async(req, res, next) => {
    console.log('user controller secret');
  }
}