import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/authMiddleware.js';
import User from '../models/user.js';

//POST /api/users/register
//Check for existing user, check all require fields, then register
export const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400);
    throw new Error('Username has been taken');
  }
  if (password === undefined || password.length < 5) {
    res.status(400);
    throw new Error('Password length is too short');
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    username: username,
    password: passwordHash,
  });

  const token = generateToken(user._id);

  res.status(201).json({ token: token, user: user });
});

//POST /api/users/login
//find user and compare passwords to login
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const validUser =
    user === null ? false : await bcrypt.compare(password, user.password);
  if (!validUser) {
    res.status(401);
    throw new Error('Invalid Username or Password');
  }

  const token = generateToken(user._id);

  res.status(200).json({ token: token, user: user });
});
