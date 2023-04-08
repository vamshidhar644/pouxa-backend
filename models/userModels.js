const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  addresses: {
    adress1: {
      type: String,
    },
    address2: {
      type: String,
    },
    address3: {
      type: String,
    },
  },
});

// static signup method
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  username,
  phone,
  password
) {
  // validation
  if (!email || !password || !firstName || !lastName || !username || !phone) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password in not strong enough');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    firstName,
    lastName,
    email,
    username,
    phone,
    password: hash,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // authentication
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect Email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

userSchema.statics.changepass = async function (email, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password });
    return user;
  }
};

module.exports = mongoose.model('User', userSchema);
