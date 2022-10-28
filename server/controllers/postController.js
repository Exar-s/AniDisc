import asyncHandler from 'express-async-handler';
import { processImage } from '../middleware/uploadMiddleware.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';
import User from '../models/user.js';


//GET /api/posts/:animeID
//Get post by anime id and paginate
export const getAllPost = asyncHandler(async (req, res) => {
  const id = req.params.animeID;
  const { page = 1 } = req.query;
  // const posts = await Post.find({ animeID: id }).populate('author', {
  //   _id: 1,
  //   username: 1,
  // });

  const posts = await Post.paginate(
    { animeID: id },
    {
      sort: { createdAt: -1 },
      page,
      limit: 10,
      populate: { path: 'author', select: '_id username profilePic createdAt' },
    }
  );
  res.status(200).json(posts);
});

//POST /api/posts/
//Create Post and update user who created post
export const newPost = asyncHandler(async (req, res) => {
  const { description, title, animeID } = req.body;
  let imgpath = '';
  if (req.file) {
    imgpath = '/images/' + (await processImage(req.file, 800, 350, 'inside'));
  }
  const newpost = await Post.create({
    title: title,
    author: req.user._id,
    description: description,
    animeID: animeID,
    image: imgpath,
  });
  await User.findByIdAndUpdate(
    req.user,
    { $push: { posts: newpost._id } },
    { new: true }
  );
  res.status(201).json(newpost);
});

//GET /api/posts/single/:id
//get singular post by id and paginate comments
export const getPost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { page = 1 } = req.query;
  const findpost = await Post.findById(id).populate('author', {
    username: 1,
    profilePic: 1,
  });
  if (findpost === null) {
    res.status(404);
    throw new Error('No such post');
  }
  const comments = await Comment.paginate(
    { post: id },
    {
      sort: { createdAt: -1 },
      page,
      limit: 25,
      populate: { path: 'author', select: '_id username profilePic' },
    }
  );
  res.status(200).json({ findpost, comments });
});

//POST /api/posts/single/:id
//Create new comment and update user and post
//populate with author for res
export const newComment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;
  const createComment = await Comment.create({
    comment: comment,
    author: req.user,
    post: id,
  });
  const newComment = await createComment.populate('author', {
    _id: 1,
    username: 1,
    profilePic: 1,
  });
  await User.findByIdAndUpdate(
    req.user,
    { $push: { comments: newComment._id } },
    { new: true }
  );
  await Post.findByIdAndUpdate(
    id,
    { $push: { comments: newComment._id } },
    { new: true }
  );
  res.status(201).json(newComment);
});
