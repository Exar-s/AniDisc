import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.js';
const { verify, sign } = jsonwebtoken;

//create token for user expires in 60min
export const generateToken = (id) => {
  return sign({ id }, process.env.SECRET, {
    expiresIn: 3600,
  });
};

//Get token
export const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

//Get user info from token
export const userExtractor = (req, res, next) => {
  const token = req.token;
  if (token) {
    verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.status(401);
        const error = new Error('Invalid Token');
        next(error);
      } else {
        const user = await User.findById(decodedToken.id);
        req.user = user._id;
        next();
      }
    });
  } else {
    res.status(401);
    const error = new Error('No Token Provided');
    next(error);
  }
};
