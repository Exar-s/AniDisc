import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import fs from 'fs';
import { processImage } from '../middleware/uploadMiddleware.js';

//GET /api/users/:username
//Get profile based on provided username
export const getUser = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404);
    throw new Error('No such User');
  }
  res.status(200).json(user);
});

//PUT /api/users/profilePic
//Update profilePic and delete prev if not default
export const updateProfilePic = asyncHandler(async (req, res) => {
  let imgpath = '';
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  } else {
    imgpath = '/images/' + (await processImage(req.file, 225, 225, 'cover'));
  }
  const currUser = await User.findById(req.user);
  if (currUser.profilePic !== '/images/default.jpg') {
    fs.unlink(`.${currUser.profilePic}`, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
  await currUser.updateOne({ profilePic: imgpath });
  res.status(200).send(imgpath);
});

//PUT /api/users/signature
//Update signature
export const updateSignature = asyncHandler(async (req, res) => {
  const { signature } = req.body;
  if (!signature || typeof signature !== 'string') {
    res.status(400);
    throw new Error('No signature provided');
  }
  if (signature.length <= 0) {
    await User.findByIdAndUpdate(req.user, { signature: 'Default signature' });
    return res.status(200).send('Default signature');
  }
  await User.findByIdAndUpdate(req.user, { signature: signature });
  res.status(200).send(signature);
});
