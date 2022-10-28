import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, userReset } from '../reducers/authReducer';
import Error from '../components/Error/Error';
import '../css/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordCon: '',
  });
  const [error, setError] = useState({
    hasError: false,
    msg: '',
  });

  const { username, password, passwordCon } = formData;
  const { hasError, msg } = error;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );

  //Retrun to home after creating account
  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
    }
    if (isError) {
      setError({ hasError: true, msg: message });
    }
    dispatch(userReset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  //Only allow alphanumeric values
  const handleChange = (e) => {
    if (e.target.name === 'username') {
      if (!/^[a-zA-Z0-9]*$/.test(e.target.value)) return;
    }
    if (!/^\S*$/.test(e.target.value)) return;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordCon) {
      return setError({ hasError: true, msg: 'Passwords do not match' });
    }
    const userData = {
      username,
      password,
    };
    dispatch(register(userData));
  };

  return (
    <div className='auth'>
      {hasError && <Error resetFunc={setError} msg={msg} />}
      <h1 className='auth-title'>REGISTER</h1>
      <div className='auth-info'>
        <p>* Username can only contain alphanumeric values</p>
        <p>* Username and password are limited to 25 chars</p>
      </div>
      <div className='auth-form'>
        <form onSubmit={handleSubmit}>
          <div className='auth-form-input-container'>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={handleChange}
              maxLength='25'
              autoComplete='off'
              required
            />
            <label htmlFor='username'>Enter A Username</label>
          </div>
          <div className='auth-form-input-container'>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={handleChange}
              maxLength='25'
              autoComplete='off'
              required
            />
            <label htmlFor='password'>Enter A Password</label>
          </div>
          <div className='auth-form-input-container'>
            <input
              type='password'
              id='passwordCon'
              name='passwordCon'
              value={passwordCon}
              onChange={handleChange}
              maxLength='25'
              autoComplete='off'
              required
            />
            <label htmlFor='passwordCon'>Reenter Password</label>
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

export default Register;
