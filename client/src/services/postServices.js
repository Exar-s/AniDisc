import axios from 'axios';
const url = 'http://localhost:3001/api/posts';

//Create new post
const newPost = async (postData, token) => {
  const config = {
    headers: {
      'content-Type': 'multipart/form-data',
      Authorization: `bearer ${token}`,
    },
  };
  const res = await axios.post(url, postData, config);
  return res.data;
};

//Get All Post on anime page
const getAllPost = async (id, page) => {
  const res = await axios.get(url + `/${id}?page=${page}`);
  return res.data;
};

//Get a post with comments 
const getSinglePost = async (id, page) => {
  const res = await axios.get(url + `/single/${id}?page=${page}`);
  return res.data;
};

//Make a comment
const postComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const res = await axios.post(
    url + `/single/${commentData.id}`,
    commentData,
    config
  );
  return res.data;
};

const postService = {
  newPost,
  getAllPost,
  getSinglePost,
  postComment,
};

export default postService;
