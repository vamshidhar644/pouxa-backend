const User = require('../models/userModels');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    const firstName = user.firstName;
    const lastName = user.lastName;
    const phone = user.phone;
    const username = user.username;

    res
      .status(200)
      .json({ email, password, token, firstName, lastName, phone, username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { firstName, lastName, email, username, phone, password } = req.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      email,
      username,
      phone,
      password
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      email,
      password,
      firstName,
      lastName,
      username,
      phone,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changepassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(404).json({ error: 'Error in hashing password:' });
    }
    const item = await User.findOneAndUpdate(
      { email: email },
      { password: hash }
    );
    return res.status(200).json(item);
  });
};

module.exports = { loginUser, signupUser, changepassword };
