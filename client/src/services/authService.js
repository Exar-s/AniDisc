import axios from 'axios';
import jwtDecode from 'jwt-decode';

const URL = 'http://localhost:3001/api/auth';

//Register user and set token in localstorage for relogin
const register = async (userData) => {
  const res = await axios.post(URL + '/register', userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

//Login user and set token in localstorage for relogin
const login = async (userData) => {
  const res = await axios.post(URL + '/login', userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

//Remove token on logout
const logOut = () => {
  localStorage.removeItem('user');
};

//Check token validity before any request
const checkToken = () => {
  if(localStorage.getItem('user') === null) return false;
  if (localStorage.getItem('user') !== 'null') {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const decodeToken = jwtDecode(token);
    if (decodeToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('user');
      return false;
    } else return true;
  } else return false;
};

const authService = {
  register,
  login,
  logOut,
  checkToken,
};

export default authService;
