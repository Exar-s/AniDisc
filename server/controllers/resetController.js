import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

export const reset = asyncHandler(async (req, res) => {
  await User.deleteMany();
  const ans = await User.find();
  if (ans.length === 0) {
    return console.log('success');
  }
  console.log('failed');
});
