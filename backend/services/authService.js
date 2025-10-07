const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId }, 
    process.env.JWT_REFRESH_SECRET, 
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

const registerUser = async (userData) => {
  const existingUser = await User.findOne({
    $or: [
      { email: userData.email },
      { username: userData.username }
    ]
  });

  if (existingUser) {
    throw new Error('User already exists with this email or username');
  }

  const user = new User(userData);
  await user.save();
  
  const { accessToken, refreshToken } = generateTokens(user._id);
  
  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    },
    accessToken,
    refreshToken
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const { accessToken, refreshToken } = generateTokens(user._id);

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    },
    accessToken,
    refreshToken
  };
};

module.exports = { registerUser, loginUser, generateTokens };