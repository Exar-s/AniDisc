import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DropList from './DropList';
import { genre, types } from '../../services/genretypes';
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { logout, userReset } from '../../reducers/authReducer';
import './dropdown.css';

const Dropdown = () => {
  const [typesActive, setTypesActive] = useState(false);
  const [genreActive, setGenreActive] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(userReset());
    navigate('/');
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // TEMPORARY, Currently using list of genre and types in local JSON
  //   useEffect(() => {
  //     axios.get('https://api.jikan.moe/v4/genres/anime').then((res) => {
  //       const hello = res.data.data.map((data) => {
  //         return { id: data.mal_id, genre: data.name };
  //       });
  //       console.log(hello)
  //     });
  //   }, []);

  return (
    <div className='dropdown-container' onClick={(e) => e.stopPropagation()}>
      <Link to='/'>
        <div className='dropdown-link'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            height='24'
            width='24'
            fill='#FFFFFF'
          >
            <path d='M4 21V9l8-6 8 6v12h-6v-7h-4v7Zm2-2h2v-7h8v7h2v-9l-6-4.5L6 10Zm6-6.75Z' />
          </svg>
          <p>HOME</p>
        </div>
      </Link>
      <Link to='/top'>
        <div className='dropdown-link'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            height='24'
            width='24'
            fill='#FFFFFF'
          >
            <path d='M3 20v-1h2v-.5H4v-1h1V17H3v-1h3v4Zm5-1v-2h13v2Zm-5-5v-.9L4.8 11H3v-1h3v.9L4.2 13H6v1Zm5-1v-2h13v2ZM4 8V5H3V4h2v4Zm4-1V5h13v2Z' />
          </svg>
          <p>TOP</p>
        </div>
      </Link>
      <div
        className='drop-items dropdown-link'
        onClick={() => {
          setGenreActive(!genreActive);
          setTypesActive(false);
        }}
      >
        <div className='dropdown-link-sides'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            height='24'
            width='24'
            fill='#FFFFFF'
          >
            <path d='M19 7.5q.425 0 .712-.287Q20 6.925 20 6.5t-.288-.713Q19.425 5.5 19 5.5t-.712.287Q18 6.075 18 6.5t.288.713q.287.287.712.287Zm-4 0q.425 0 .713-.287Q16 6.925 16 6.5t-.287-.713Q15.425 5.5 15 5.5t-.712.287Q14 6.075 14 6.5t.288.713q.287.287.712.287Zm-.5 3.4h5q0-.875-.762-1.388Q17.975 9 17 9t-1.737.512q-.763.513-.763 1.388ZM7 22q-2.5 0-4.25-1.75T1 16V9h12v7q0 2.5-1.75 4.25T7 22Zm0-2q1.65 0 2.825-1.175Q11 17.65 11 16v-5H3v5q0 1.65 1.175 2.825Q5.35 20 7 20Zm10-5q-.65 0-1.287-.137-.638-.138-1.213-.413V12.1q.55.425 1.188.662Q16.325 13 17 13q1.65 0 2.825-1.175Q21 10.65 21 9V4h-8v3.5h-2V2h12v7q0 2.5-1.75 4.25T17 15Zm-12-.5q.425 0 .713-.288Q6 13.925 6 13.5t-.287-.713Q5.425 12.5 5 12.5t-.713.287Q4 13.075 4 13.5t.287.712q.288.288.713.288Zm4 0q.425 0 .713-.288.287-.287.287-.712t-.287-.713Q9.425 12.5 9 12.5t-.712.287Q8 13.075 8 13.5t.288.712q.287.288.712.288Zm-2 3.4q.975 0 1.738-.513Q9.5 16.875 9.5 16h-5q0 .875.763 1.387.762.513 1.737.513Zm0-2.4Zm10-7Z' />
          </svg>
          <p>GENRE</p>
          <svg
            className='arrow-icon'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            height='24'
            width='24'
            fill='#FFFFFF'
          >
            <path d='M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z' />
          </svg>
          <svg
            className='arrow-icon-down'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            height='24'
            width='24'
            fill='#FFFFFF'
          >
            <path d='m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z' />
          </svg>
        </div>
        <CSSTransition
          in={genreActive}
          timeout={200}
          classNames='dropsideuse'
          unmountOnExit
        >
          <DropList list={genre} number={true} />
        </CSSTransition>
      </div>
      <div
        className='drop-items dropdown-link'
        onClick={() => {
          setTypesActive(!typesActive);
          setGenreActive(false);
        }}
      >
        <div className='dropdown-link-sides'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            height='24'
            width='24'
            fill='#FFFFFF'
          >
            <path d='M10.5 20V7H5V4h14v3h-5.5v13Z' />
          </svg>
          <p>TYPES</p>
          <svg
            className='arrow-icon'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            height='24'
            width='24'
            fill='#FFFFFF'
          >
            <path d='M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z' />
          </svg>
          <svg
            className='arrow-icon-down'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            height='24'
            width='24'
            fill='#FFFFFF'
          >
            <path d='m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z' />
          </svg>
        </div>
        <CSSTransition
          in={typesActive}
          timeout={200}
          classNames='dropsideuse'
          unmountOnExit
        >
          <DropList list={types} number={false} />
        </CSSTransition>
      </div>
      <Link to='/filter'>
        <div className='dropdown-link'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            height='24'
            width='24'
            fill='#FFFFFF'
          >
            <path d='M11 20q-.425 0-.712-.288Q10 19.425 10 19v-6L4.2 5.6q-.375-.5-.112-1.05Q4.35 4 5 4h14q.65 0 .913.55.262.55-.113 1.05L14 13v6q0 .425-.287.712Q13.425 20 13 20Zm1-7.7L16.95 6h-9.9Zm0 0Z' />
          </svg>
          <p>FILTER</p>
        </div>
      </Link>
      {user !== null ? (
        <div className='dropdown-auth'>
          <div className='dropdown-auth-user'>
            <Link to={`/user/${user.user.username}`}>
              <img src={`http://localhost:3001${user.user.profilePic}`} alt='' />
            </Link>
            <div>Welcome {user.user.username}!</div>
          </div>
          <button onClick={handleLogOut} className='auth-button'>
            Log Out
          </button>
        </div>
      ) : (
        <div className='dropdown-auth-other'>
          <Link to='/register'>
            <button className='signup auth-button'>Sign Up</button>
          </Link>
          <Link to='/login'>
            <button className='login auth-button'>Log In</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
