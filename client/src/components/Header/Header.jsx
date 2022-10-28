import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userReset, logout } from '../../reducers/authReducer';
import whitelogo from '../../imgs/aniLogo2.png';
import search_white from '../../imgs/search_white.svg';
import Dropdown from '../Dropdown/Dropdown';
import { CSSTransition } from 'react-transition-group';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState('');
  const location = useLocation();
  const dropRef = useRef();

  useEffect(() => {
    setActive(false);
  }, [location]);

  useEffect(() => {
    const closeMenu = (e) => {
      if (!dropRef.current.contains(e.target)) {
        setActive(false);
      }
    };
    //Close dropdown menu if clicking outside of dropdown
    document.body.addEventListener('mousedown', closeMenu);

    return () => {
      document.body.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleMenuToggle = () => {
    setActive(!active);
  };

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(userReset());
    navigate('/');
  };

  //Search Bar query
  //Send first state true to update select options in filter on first load
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/filter?q=${text}`, { state: { first: true } });
    setText('');
  };

  return (
    <header>
      <div className='header-container'>
        <div className='header-wrapper'>
          <div className='header-first'>
            <div
              className={`menu-toggle ${active ? 'active' : ''}`}
              onClick={handleMenuToggle}
              ref={dropRef}
            >
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
              <CSSTransition
                in={active}
                timeout={200}
                classNames='dropdown'
                unmountOnExit
              >
                <Dropdown />
              </CSSTransition>
            </div>
            <div className='logo'>
              <Link to='/'>
                <img src={whitelogo} alt='Anidisc Logo' />
              </Link>
            </div>
            <div className='search-field'>
              <form onSubmit={handleSubmit}>
                <img src={search_white} alt='search-icon' />
                <input
                  type='text'
                  value={text}
                  placeholder='Enter an anime...'
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
            </div>
          </div>
          {user !== null ? (
            <div className='header-second'>
              <div>Welcome {user.user.username}!</div>
              <Link to={`/user/${user.user.username}`}>
                {' '}
                <div
                  className='header-second-img'
                  style={{ backgroundImage: `url(http://localhost:3001${user.user.profilePic})` }}
                ></div>
              </Link>
              <button onClick={handleLogOut} className='auth-button'>
                Log Out
              </button>
            </div>
          ) : (
            <div className='header-second'>
              <Link to='/register'>
                <button className='signup auth-button'>Sign Up</button>
              </Link>
              <Link to='/login'>
                <button className='login auth-button'>Log In</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
