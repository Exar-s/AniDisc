import axios from 'axios';

const url = 'https://anidisc-api.onrender.com/api/users';

//Get a user's profile 
const getUser = async (username) => {
  const res = await axios.get(url + `/${username}`);
  return res.data;
};

//Update logged in user's profile picture 
const updateProfilePic = async (picData, token) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `bearer ${token}`,
    },
  };
  const res = await axios.put(url + '/profilepic', picData, config);
  return res.data;
};

//Update logged in user's signature 
const updateSignature = async (signatureData, token) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const res = await axios.put(url + '/signature', signatureData, config);
  return res.data;
};

const userService = {
  getUser,
  updateProfilePic,
  updateSignature,
};

export default userService;
