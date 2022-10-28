import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, userReset } from '../reducers/authReducer';
import Error from '../components/Error/Error';
import '../css/auth.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({
    hasError: false,
    msg: '',
  });

  const { username, password } = loginData;
  const { hasError, msg } = error;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  //Navigate back one page after successful login
  useEffect(() => {
    if (isSuccess || user) {
      return navigate(-1);
    }
    if (isError) {
      setError({ hasError: true, msg: message });
    }
    dispatch(userReset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  //Submit login form
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
  };

  //Handle login form changes
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='auth'>
      {hasError && <Error resetFunc={setError} msg={msg} />}
      <h1 className='auth-title'>LOGIN</h1>
      <div className='auth-form'>
        <form onSubmit={handleSubmit}>
          <div className='auth-form-input-container'>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={handleChange}
              autoComplete='off'
              required
            />
            <label htmlFor='username'>Username</label>
          </div>
          <div className='auth-form-input-container'>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={handleChange}
              autoComplete='off'
              required
            />
            <label htmlFor='password'>Password</label>
          </div>

          <div>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <button type='submit' className='auth-button'>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
